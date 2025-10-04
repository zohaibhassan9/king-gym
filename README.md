# King Gym Management System

A comprehensive gym management system built with Next.js, TypeScript, and Tailwind CSS. This system provides complete functionality for managing gym members, payments, attendance, and administrative tasks.

## 🏋️ Features

### Member Registration Module
- **Member Information**: Name, CNIC Number, Contact Number, Address
- **Package Selection**: 
  - Cardio Package ($29/month)
  - Weight Training Package ($39/month) 
  - With Trainer Package ($79/month)
  - With Coach Package ($99/month)
- **Membership Details**: Joining Date, Expiry Date
- **Form Validation**: Complete client-side validation with error handling

### Fee & Payment Management
- **Payment Methods**: Cash, JazzCash, EasyPaisa, Bank Transfer, Credit/Debit Card
- **Online Payment Verification**: Admin approval system for online payments
- **Payment History**: Complete transaction records
- **Fee Expiry Notifications**: Automated alerts for expiring memberships

### Attendance System
- **Check-in/Check-out**: Manual member attendance tracking
- **Real-time Dashboard**: Live attendance statistics
- **Attendance Reports**: Daily, weekly, and monthly reports
- **Member Status Tracking**: Active, completed, and pending statuses

### Admin Dashboard
- **Member Management**: View, edit, and manage all members
- **Payment Approvals**: Approve/reject online payments
- **Membership Renewals**: Track and manage expiring memberships
- **Statistics Overview**: Key metrics and performance indicators
- **Notification System**: Alerts for expiring memberships and pending payments

### Reports & Records
- **Active Members List**: Current active members
- **Expired Members List**: Members with expired memberships
- **Pending Payment Members**: Members with outstanding payments
- **Attendance Reports**: Comprehensive attendance analytics
- **Payment Reports**: Financial transaction summaries

### Security & User Roles
- **Admin Login**: Full access to all features
- **Staff Login**: Limited access for attendance and basic services
- **Member Login**: Access to personal dashboard and services
- **Role-based Navigation**: Different interfaces based on user role

## 🎨 Design & UI

- **Modern Responsive Design**: Mobile-first approach with Tailwind CSS
- **Black & Orange Theme**: Professional color scheme as requested
- **Interactive Components**: Smooth animations and transitions
- **Accessibility**: WCAG compliant design patterns
- **Cross-browser Compatibility**: Works on all modern browsers

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd king-gym
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
```bash
npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Credentials

For testing purposes, use these credentials:

**Admin Access:**
- Email: `admin@kinggym.com`
- Password: `admin123`
- Role: Admin

**Staff Access:**
- Email: `staff@kinggym.com` 
- Password: `staff123`
- Role: Staff

**Member Access:**
- Email: `member@kinggym.com`
- Password: `member123`
- Role: Member

## 📁 Project Structure

```
king-gym/
├── src/
│   ├── app/
│   │   ├── admin/           # Admin dashboard
│   │   ├── attendance/      # Attendance management
│   │   ├── dashboard/       # Member dashboard
│   │   ├── login/          # Authentication
│   │   ├── membership/     # Package display
│   │   ├── payments/       # Payment management
│   │   ├── register/       # Member registration
│   │   ├── staff/          # Staff dashboard
│   │   └── page.tsx        # Homepage
│   ├── components/
│   │   └── Layout/         # Layout components
│   └── globals.css         # Global styles
├── public/                 # Static assets
└── README.md
```

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Heroicons
- **State Management**: React Hooks
- **Form Handling**: Controlled components with validation
- **Routing**: Next.js App Router

## 📱 Pages & Features

### Public Pages
- **Homepage** (`/`): Hero section, features, packages, CTA
- **Membership** (`/membership`): Package details and pricing
- **Login** (`/login`): Role-based authentication
- **Register** (`/register`): Member registration form

### Member Pages
- **Dashboard** (`/dashboard`): Personal dashboard with stats and activity
- **Payments** (`/payments`): Payment history and new payments
- **Attendance** (`/attendance`): Check-in/out and attendance reports

### Staff Pages
- **Staff Dashboard** (`/staff`): Limited access dashboard
- **Attendance Management**: Member check-in/out tracking
- **Member Services**: Basic member management

### Admin Pages
- **Admin Dashboard** (`/admin`): Complete management interface
- **Member Management**: Full CRUD operations
- **Payment Approvals**: Online payment verification
- **Reports**: Comprehensive analytics and reporting

## 🔧 Customization

### Adding New Packages
Edit the packages array in `/src/app/membership/page.tsx`:

```typescript
const packages = [
  {
    id: 'new-package',
    name: 'New Package',
    price: 49,
    period: 'month',
    features: ['Feature 1', 'Feature 2'],
    popular: false
  }
];
```

### Modifying Payment Methods
Update the payment methods in `/src/app/payments/page.tsx`:

```typescript
const paymentMethods = [
  { id: 'new-method', name: 'New Method', icon: NewIcon, description: 'Description' }
];
```

### Styling Changes
The theme can be customized in `/src/app/globals.css`:

```css
:root {
  --primary: #ea580c;      /* Orange color */
  --primary-dark: #c2410c; /* Darker orange */
  --secondary: #1f2937;    /* Dark gray */
}
```

## 📊 Key Features Implemented

✅ **Member Registration** - Complete form with validation  
✅ **Payment Management** - Multiple payment methods with approval workflow  
✅ **Attendance System** - Check-in/out with reporting  
✅ **Admin Dashboard** - Full management interface  
✅ **Role-based Access** - Admin, Staff, Member roles  
✅ **Responsive Design** - Mobile-first approach  
✅ **Modern UI/UX** - Professional black and orange theme  
✅ **Form Validation** - Client-side validation with error handling  
✅ **Notification System** - Expiry alerts and status updates  
✅ **Reports & Analytics** - Comprehensive reporting system  

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
- **Netlify**: Connect GitHub repository
- **Railway**: Deploy with one click
- **DigitalOcean**: Use App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Email: support@kinggym.com
- Phone: +1 (555) 123-4567
- Address: 123 Fitness Street, Gym City, GC 12345

## 🎯 Future Enhancements

- [ ] Mobile app integration
- [ ] QR code check-in system
- [ ] Biometric attendance
- [ ] Advanced analytics dashboard
- [ ] Email/SMS notifications
- [ ] Class scheduling system
- [ ] Personal trainer booking
- [ ] Nutrition tracking
- [ ] Social features
- [ ] API integration

---

**King Gym Management System** - Transform your gym operations with our comprehensive management solution! 🏋️‍♂️💪