import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data');
const MEMBERS_FILE = path.join(DB_PATH, 'members.json');
const PAYMENTS_FILE = path.join(DB_PATH, 'payments.json');
const ATTENDANCE_FILE = path.join(DB_PATH, 'attendance.json');

// Ensure data directory exists
if (!fs.existsSync(DB_PATH)) {
  fs.mkdirSync(DB_PATH, { recursive: true });
}

// Initialize database files if they don't exist
const initializeDatabase = () => {
  if (!fs.existsSync(MEMBERS_FILE)) {
    fs.writeFileSync(MEMBERS_FILE, JSON.stringify([]));
  }
  if (!fs.existsSync(PAYMENTS_FILE)) {
    fs.writeFileSync(PAYMENTS_FILE, JSON.stringify([]));
  }
  if (!fs.existsSync(ATTENDANCE_FILE)) {
    fs.writeFileSync(ATTENDANCE_FILE, JSON.stringify([]));
  }
};

// Initialize database on import
initializeDatabase();

// Generate unique member ID
const generateMemberId = () => {
  const members = getMembers();
  const lastId = members.length > 0 ? Math.max(...members.map(m => parseInt(m.memberId.replace('KG', '')))) : 0;
  return `KG${String(lastId + 1).padStart(3, '0')}`;
};

// Generate unique transaction ID
const generateTransactionId = () => {
  return `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
};

// Read data from file
const readFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
};

// Write data to file
const writeFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
};

// Member operations
const getMembers = () => {
  initializeDatabase();
  return readFile(MEMBERS_FILE);
};

const getMemberById = (id) => {
  const members = getMembers();
  return members.find(member => member.id === id);
};

const addMember = (memberData) => {
  const members = getMembers();
  const newMember = {
    id: Date.now(), // Internal ID
    memberId: generateMemberId(), // Display ID
    ...memberData,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  members.push(newMember);
  writeFile(MEMBERS_FILE, members);
  return newMember;
};

const updateMember = (id, updateData) => {
  const members = getMembers();
  const memberIndex = members.findIndex(member => member.id === id);
  
  if (memberIndex !== -1) {
    members[memberIndex] = {
      ...members[memberIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    writeFile(MEMBERS_FILE, members);
    return members[memberIndex];
  }
  return null;
};

const deleteMember = (id) => {
  const members = getMembers();
  const filteredMembers = members.filter(member => member.id !== id);
  writeFile(MEMBERS_FILE, filteredMembers);
  return true;
};

// Payment operations
const getPayments = () => {
  initializeDatabase();
  return readFile(PAYMENTS_FILE);
};

const getPaymentsByMemberId = (memberId) => {
  const payments = getPayments();
  return payments.filter(payment => payment.memberId === memberId);
};

const addPayment = (paymentData) => {
  const payments = getPayments();
  const newPayment = {
    id: generateTransactionId(),
    ...paymentData,
    createdAt: new Date().toISOString()
  };
  
  payments.push(newPayment);
  writeFile(PAYMENTS_FILE, payments);
  return newPayment;
};

// Attendance operations
const getAttendance = () => {
  initializeDatabase();
  return readFile(ATTENDANCE_FILE);
};

const getAttendanceByMemberId = (memberId) => {
  const attendance = getAttendance();
  return attendance.filter(record => record.memberId === memberId);
};

const addAttendance = (attendanceData) => {
  const attendance = getAttendance();
  const newRecord = {
    id: Date.now(),
    ...attendanceData,
    createdAt: new Date().toISOString()
  };
  
  attendance.push(newRecord);
  writeFile(ATTENDANCE_FILE, attendance);
  return newRecord;
};

// Utility functions
const getExpiringMembers = (days = 5) => {
  const members = getMembers();
  const today = new Date();
  const expiryDate = new Date(today);
  expiryDate.setDate(today.getDate() + days);
  
  return members.filter(member => {
    const memberExpiry = new Date(member.expiryDate);
    return memberExpiry <= expiryDate && memberExpiry >= today && member.status === 'active';
  });
};

const getExpiredMembers = () => {
  const members = getMembers();
  const today = new Date();
  
  return members.filter(member => {
    const memberExpiry = new Date(member.expiryDate);
    return memberExpiry < today && member.status !== 'expired';
  });
};

const getActiveMembers = () => {
  const members = getMembers();
  return members.filter(member => member.status === 'active');
};

const getTodayAttendance = () => {
  const attendance = getAttendance();
  const today = new Date().toISOString().split('T')[0];
  
  return attendance.filter(record => record.date === today);
};

// Package validation
const validatePackagePrice = (packageName, amount) => {
  const packagePrices = {
    'Men Cardio': 4000,
    'Men Normal': 3000,
    'Couple (Separate Floor)': 6000,
    'Ladies (Separate Floor)': 4000
  };
  
  return packagePrices[packageName] === amount;
};

// Extend membership if payment is valid
const processPayment = (memberId, paymentData) => {
  const member = getMemberById(memberId);
  if (!member) {
    throw new Error('Member not found');
  }
  
  // Validate payment amount
  if (!validatePackagePrice(member.package, paymentData.amount)) {
    throw new Error(`Invalid payment amount. Expected Rs ${getPackagePrice(member.package)}, got Rs ${paymentData.amount}`);
  }
  
  // Add payment
  const payment = addPayment({
    ...paymentData,
    memberId: memberId,
    memberName: member.memberName
  });
  
  // Extend membership by 1 month from current expiry date
  const currentExpiry = new Date(member.expiryDate);
  const newExpiry = new Date(currentExpiry);
  newExpiry.setMonth(newExpiry.getMonth() + 1);
  
  // Update member
  updateMember(memberId, {
    expiryDate: newExpiry.toISOString().split('T')[0],
    status: 'active'
  });
  
  return {
    payment,
    newExpiryDate: newExpiry.toISOString().split('T')[0]
  };
};

const getPackagePrice = (packageName) => {
  const packagePrices = {
    'Men Cardio': 4000,
    'Men Normal': 3000,
    'Couple (Separate Floor)': 6000,
    'Ladies (Separate Floor)': 4000
  };
  
  return packagePrices[packageName] || 0;
};

export {
  initializeDatabase,
  getMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
  getPayments,
  getPaymentsByMemberId,
  addPayment,
  getAttendance,
  getAttendanceByMemberId,
  addAttendance,
  getExpiringMembers,
  getExpiredMembers,
  getActiveMembers,
  getTodayAttendance,
  validatePackagePrice,
  processPayment,
  getPackagePrice
};

const db = {
  initializeDatabase,
  getMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
  getPayments,
  getPaymentsByMemberId,
  addPayment,
  getAttendance,
  getAttendanceByMemberId,
  addAttendance,
  getExpiringMembers,
  getExpiredMembers,
  getActiveMembers,
  getTodayAttendance,
  validatePackagePrice,
  processPayment,
  getPackagePrice
};

export default db;
