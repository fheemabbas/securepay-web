import React, { lazy } from "react";
// import ClientLayout from "./layout/Client/index";
// import AdminLayout from "./layout/Admin/index";
// import Verify from "./pages/Verification/index";
// import FirstTimeVerify from "./pages/Verification/FirstTimeVerify";
const ClientLayout = lazy(() =>
  import(
    /* webpackChunkName: "login" */ /* webpackPreload: true */ "./layout/Client/index"
  )
);
const AdminLayout = lazy(() =>
  import(
    /* webpackChunkName: "login" */ /* webpackPreload: true */ "./layout/Admin/index"
  )
);
const Verify = lazy(() =>
  import(
    /* webpackChunkName: "login" */ /* webpackPreload: true */ "./pages/Verification/index"
  )
);
const FirstTimeVerify = lazy(() =>
  import(
    /* webpackChunkName: "login" */ /* webpackPreload: true */ "./pages/Verification/FirstTimeVerify"
  )
);
const SetPasswordWithOTP = lazy(() =>
  import(
    /* webpackChunkName: "login" */ /* webpackPreload: true */ "./pages/Verification/SetPasswordOTPbased"
  )
);
const Login = lazy(() =>
  import(
    /* webpackChunkName: "login" */ /* webpackPreload: true */ "./pages/Client/Login"
  )
);

const VerifyOTP = lazy(() =>
  import(
    /* webpackChunkName: "verifyotp" */ /* webpackPreload: true */ "./pages/Client/VerifyOTP"
  )
);
const ForgotPassword = lazy(() =>
  import(
    /* webpackChunkName: "forgotpassword" */ /* webpackPreload: true */ "./pages/Client/ForgotPassword"
  )
);
const ResetPassword = lazy(() =>
  import(
    /* webpackChunkName: "resetpassword" */ /* webpackPreload: true */ "./pages/Client/ResetPassword"
  )
);
const SignUp = lazy(() =>
  import(
    /* webpackChunkName: "signup" */ /* webpackPreload: true */ "./pages/Client/SignUp"
  )
);
const SignUpEmail = lazy(() =>
  import(
    /* webpackChunkName: "signupemail" */ /* webpackPreload: true */ "./pages/Client/SignUpEmail"
  )
);
const SignUpGoogle = lazy(() =>
  import(
    /* webpackChunkName: "signupgoogle" */ /* webpackPreload: true */ "./pages/Client/SignUpGoogle"
  )
);
// const SignUpFacebook = lazy(() =>
//   import(
//     /* webpackChunkName: "signupfacebook" */ /* webpackPreload: true */ "./pages/Client/SignUpFacebook"
//   )
// );
const Dashboard = lazy(() =>
  import(
    /* webpackChunkName: "dashboard" */ /* webpackPreload: true */ "./pages/Client/Dashboard"
  )
);
const Profile = lazy(() =>
  import(
    /* webpackChunkName: "profile" */ /* webpackPreload: true */ "./pages/Client/Profile"
  )
);
const SignUpIndividual = lazy(() =>
  import(
    /* webpackChunkName: "signupindividual" */ /* webpackPreload: true */ "./pages/Client/SignUpIndividual"
  )
);
const SignUpOrganisation = lazy(() =>
  import(
    /* webpackChunkName: "signuporganisation" */ /* webpackPreload: true */ "./pages/Client/SignUpOrganisation"
  )
);
const TicketListing = lazy(() =>
  import(
    /* webpackChunkName: "ticketlisting" */ /* webpackPreload: true */ "./pages/Client/SupportTicketManagement/TicketListing/TicketListing"
  )
);
const TicketDetails = lazy(() =>
  import(
    /* webpackChunkName: "ticketdetails" */ /* webpackPreload: true */ "./pages/Client/SupportTicketManagement/TicketDetails/TicketDetails"
  )
);
const PaymentListing = lazy(() =>
  import(
    /* webpackChunkName: "paymentlisting" */ /* webpackPreload: true */ "./pages/Client/PaymentManagement/PaymentListing/PaymentListing"
  )
);
const PaymentDetails = lazy(() =>
  import(
    /* webpackChunkName: "paymentdetails" */ /* webpackPreload: true */ "./pages/Client/PaymentManagement/PaymentDetails/PaymentDetails"
  )
);

// // admin

const AdminLogin = lazy(() =>
  import(
    /* webpackChunkName: "adminlogin" */ /* webpackPreload: true */ "./pages/Admin/Login"
  )
);
const AdminForgotPassword = lazy(() =>
  import(
    /* webpackChunkName: "adminforgotpassword" */ /* webpackPreload: true */ "./pages/Admin/ForgotPassword"
  )
);
const AdminResetPassword = lazy(() =>
  import(
    /* webpackChunkName: "adminresetpassword" */ /* webpackPreload: true */ "./pages/Admin/ResetPassword"
  )
);
const AdminDashboard = lazy(() =>
  import(
    /* webpackChunkName: "admindashboard" */ /* webpackPreload: true */ "./pages/Admin/Dashboard"
  )
);

const StaffListing = lazy(() =>
  import(
    /* webpackChunkName: "stafflisting" */ /* webpackPreload: true */ "./pages/Admin/StaffManagement/StaffListing/StaffListing"
  )
);
const CreateJob = lazy(() =>
  import(
    /* webpackChunkName: "createjob" */ /* webpackPreload: true */ "./pages/Admin/JobManagement/CreateJob/CreateJob"
  )
);
const JobListing = lazy(() =>
  import(
    /* webpackChunkName: "joblisting" */ /* webpackPreload: true */ "./pages/Admin/JobManagement/JobListing/JobListing"
  )
);
const JobDetails = lazy(() =>
  import(
    /* webpackChunkName: "jobdetails" */ /* webpackPreload: true */ "./pages/Admin/JobManagement/JobDetails/JobDetails"
  )
);
const DisputeManagement = lazy(() =>
  import(
    /* webpackChunkName: "disputemanagement" */ /* webpackPreload: true */ "./pages/Admin/DisputeManagement/DisputeListing"
  )
);

const DisputeDetails = lazy(() =>
  import(
    /* webpackChunkName: "disputedetails" */ /* webpackPreload: true */ "./pages/Admin/DisputeManagement/DisputeDetails/DisputeDetails"
  )
);
const AdminTicketListing = lazy(() =>
  import(
    /* webpackChunkName: "adminticketlisting" */ /* webpackPreload: true */ "./pages/Admin/SupportTicketManagement/TicketListing/TicketListing"
  )
);
const AdminTicketDetails = lazy(() =>
  import(
    /* webpackChunkName: "adminticketdetails" */ /* webpackPreload: true */ "./pages/Admin/SupportTicketManagement/TicketDetails/TicketDetails"
  )
);
const PaymentHistory = lazy(() =>
  import(
    /* webpackChunkName: "paymenthistory" */ /* webpackPreload: true */ "./pages/Admin/PaymentHistory/PaymentHistory/PaymentHistory"
  )
);
const ClientUser = lazy(() =>
  import(
    /* webpackChunkName: "clientuser" */ /* webpackPreload: true */ "./pages/Admin/User/ClientUser/ClientUser"
  )
);

const AdminVerifyOTP = lazy(() =>
  import(
    /* webpackChunkName: "verifyotp" */ /* webpackPreload: true */ "./pages/Admin/VerifyOTP"
  )
);
// const BusinessCategory = lazy(() =>
//   import(
//     /* webpackChunkName: "businesscategory" */ /* webpackPreload: true */ "./pages/Admin/BusinessCategory/BusinessCategory/BusinessCategory"
//   )
// );

const routes = [
  // admin 
  {
    path: "/admin/login",
    component: AdminLogin,
    exact: true,
    authenticate: false
  },
  {
    path: "/admin/forgot-password",
    component: AdminForgotPassword,
    exact: true,
    authenticate: false
  },
  {
    path: "/admin/verifyotp",
    component: AdminVerifyOTP,
    exact: true,
    authenticate: false
  },
  {
    path: "/admin/reset-password",
    component: AdminResetPassword,
    exact: true,
    authenticate: false
  },
  {
    path: "/admin",
    component: AdminLogin,
    exact: true,
    authenticate: false
  },

  // Client
  {
    path: "/login",
    component: Login,
    exact: true,
    authenticate: false
  },
  {
    path: "/verifyotp",
    component: VerifyOTP,
    exact: true,
    authenticate: false
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    exact: true,
    authenticate: false
  },
  {
    path: "/reset-password",
    component: ResetPassword,
    exact: true,
    authenticate: false
  },
  {
    path: "/sign-up",
    component: SignUp,
    exact: true,
    authenticate: false
  },
  {
    path: "/signup-email",
    component: SignUpEmail,
    exact: true,
    authenticate: false
  },
  {
    path: "/signup-with-social",
    component: SignUpGoogle,
    exact: true,
    authenticate: false
  },
  // {
  //   path: "/signup-facebook",
  //   component: SignUpFacebook,
  //   exact: true,
  // },
  {
    path: "/signup-individual",
    component: SignUpIndividual,
    exact: true,
    authenticate: false
  },
  {
    path: "/signup-organisation",
    component: SignUpOrganisation,
    exact: true,
    authenticate: false
  },

  // Client
  {
    path: "/login",
    component: Login,
    exact: true,
    authenticate: false
  },
  // {
  //   path: "/verifyotp",
  //   component: VerifyOTP,
  //   exact: true,
  //   authenticate: false
  // },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    exact: true,
    authenticate: false
  },
  {
    path: "/resetpassword",
    component: ResetPassword,
    exact: true,
    authenticate: false
  },
  {
    path: "/verify",
    component: Verify,
    exact: true,
    authenticate: false
  },
  {
    path: "/first-time-verify",
    component: FirstTimeVerify,
    exact: true,
    authenticate: false
  },
  {
    path: "/set-password",
    component: SetPasswordWithOTP,
    exact: true,
    authenticate: false
  },
  {
    path: "/sign-up",
    component: SignUp,
    exact: true,
    authenticate: false
  },
  {
    path: "/signup-email",
    component: SignUpEmail,
    exact: true,
    authenticate: false
  },
  // {
  //   path: "/signup-google",
  //   component: SignUpGoogle,
  //   exact: true,
  // },
  // {
  //   path: "/signup-facebook",
  //   component: SignUpFacebook,
  //   exact: true,
  // },
  {
    path: "/signup-individual",
    component: SignUpIndividual,
    exact: true,
    authenticate: false
  },
  {
    path: "/signup-organisation",
    component: SignUpOrganisation,
    exact: true,
    authenticate: false
  },

  {
    path: "/admin",
    component: AdminLayout,
    authenticate: false
  },
  {
    path: "/",
    component: ClientLayout,
    authenticate: false
  },
];

export const ClientLayoutRoute = [

  {
    path: "/",
    component: Login,
    exact: true,
    authenticate: false
  },
  {
    path: "/dashboard",
    component: Dashboard,
    exact: true,
    authenticate: false
  },
  {
    path: "/tickets",
    component: TicketListing,
    exact: true,
    authenticate: false
  },
  {
    path: "/tickets/details",
    component: TicketDetails,
    exact: true,
    authenticate: false
  },
  {
    path: "/payments",
    component: PaymentListing,
    exact: true,
    authenticate: false
  },
  {
    path: "/payments/details",
    component: PaymentDetails,
    exact: true,
    authenticate: false
  },
  {
    path: "/profile",
    component: Profile,
    exact: true,
    authenticate: false
  }
];

export const AdminLayoutRoute = [
  {
    path: "/admin/dashboard",
    component: AdminDashboard,
    exact: true,
    authenticate: true
  },
  {
    path: "/admin/staff",
    component: StaffListing,
    exact: true,
    authenticate: true
  },
  {
    path: "/admin/user-management",
    component: ClientUser,
    exact: true,
    authenticate: true
  },
  // {
  //   path: "/admin/business",
  //   component: BusinessCategory,
  //   exact: true,
  //   authenticate: true
  // },
  {
    path: "/admin/jobs",
    component: JobListing,
    exact: true,
    authenticate: true
  },
  {
    path: "/admin/jobs/details",
    component: JobDetails,
    exact: true,
    authenticate: true
  },
  {
    path: "/admin/jobs/create",
    component: CreateJob,
    exact: true,
    authenticate: true
  },
  {
    path: "/admin/disputes",
    component: DisputeManagement,
    exact: true,
    authenticate: true
  },
  {
    path: "/admin/disputes/details",
    component: DisputeDetails,
    exact: true,
    authenticate: true
  },
  {
    path: "/admin/tickets",
    component: AdminTicketListing,
    exact: true,
    authenticate: true
  },
  {
    path: "/admin/tickets/details",
    component: AdminTicketDetails,
    exact: true,
    authenticate: true
  },
  {
    path: "/admin/payments",
    component: PaymentHistory,
    exact: true,
    authenticate: true
  }
];

export default routes;
