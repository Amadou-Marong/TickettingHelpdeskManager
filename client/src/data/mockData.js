import { User } from 'lucide-react';

// Define mock data for tickets
export const mockTickets = [
  {
    id: 'TK-001',
    title: 'Unable to login to application',
    description: 'I keep getting "Invalid credentials" error when trying to login, but I\'m sure my password is correct.',
    status: 'open',
    priority: 'high',
    category: 'Access Issues',
    assignee: 'Jane Smith',
    createdBy: {
      id: 'USER-001',
      name: 'John Doe',
      avatar: undefined
    },
    assignedTo: {
      id: 'USER-002',
      name: 'Jane Smith',
      avatar: undefined
    },
    createdAt: '2023-06-15T09:30:00Z',
    updatedAt: '2023-06-15T09:30:00Z',
    commentsCount: 2,
  },
  {
    id: 'TK-002',
    title: 'Email sync not working',
    description: 'Outlook is not syncing with the server for the last 2 hours.',
    status: 'in-progress',
    priority: 'medium',
    category: 'Email',
    assignee: 'Alex Johnson',
    createdBy: {
      id: 'USER-003',
      name: 'Sarah Williams',
      avatar: undefined
    },
    assignedTo: {
      id: 'USER-004',
      name: 'Alex Johnson',
      avatar: undefined
    },
    createdAt: '2023-06-14T14:20:00Z',
    updatedAt: '2023-06-15T10:15:00Z',
    commentsCount: 1,
  },
  {
    id: 'TK-003',
    title: 'Need software installation',
    description: 'Requesting installation of Adobe Creative Suite on my workstation.',
    status: 'on-hold',
    priority: 'low',
    category: 'Software Request',
    assignee: 'Michael Brown',
    createdBy: {
      id: 'USER-005',
      name: 'Emily Davis',
      avatar: undefined
    },
    assignedTo: {
      id: 'USER-006',
      name: 'Michael Brown',
      avatar: undefined
    },
    createdAt: '2023-06-13T11:45:00Z',
    updatedAt: '2023-06-15T08:30:00Z',
    commentsCount: 1,
  },
  {
    id: 'TK-004',
    title: 'Network connectivity issues',
    description: 'Experiencing intermittent connectivity drops in the marketing department.',
    status: 'escalated',
    priority: 'urgent',
    category: 'Network',
    assignee: 'David Wilson',
    createdBy: {
      id: 'USER-007',
      name: 'Jessica Taylor',
      avatar: undefined
    },
    assignedTo: {
      id: 'USER-008',
      name: 'David Wilson',
      avatar: undefined
    },
    createdAt: '2023-06-15T07:10:00Z',
    updatedAt: '2023-06-15T11:20:00Z',
    commentsCount: 1,
  },
  {
    id: 'TK-005',
    title: 'Printer not working',
    description: 'The HP printer in the finance department is showing error code 50.3.',
    status: 'resolved',
    priority: 'medium',
    category: 'Hardware',
    assignee: 'Robert Miller',
    createdBy: {
      id: 'USER-009',
      name: 'Amanda Clark',
      avatar: undefined
    },
    assignedTo: {
      id: 'USER-010',
      name: 'Robert Miller',
      avatar: undefined
    },
    createdAt: '2023-06-12T15:30:00Z',
    updatedAt: '2023-06-14T09:45:00Z',
    commentsCount: 0,
  }
];

// Define mock data for comments
export const mockComments = [
  {
    id: 'CM-001',
    ticketId: 'TK-001',
    content: 'I\'ve reset your password. Please try logging in with the temporary password sent to your email.',
    author: 'Jane Smith',
    createdAt: '2023-06-15T10:15:00Z',
    user: {
      id: 'USER-002',
      name: 'Jane Smith',
      avatar: undefined,
      role: 'Support Agent'
    }
  },
  {
    id: 'CM-002',
    ticketId: 'TK-001',
    content: 'Still not working. I didn\'t receive any email with a temporary password.',
    author: 'John Doe',
    createdAt: '2023-06-15T10:30:00Z',
    user: {
      id: 'USER-001',
      name: 'John Doe',
      avatar: undefined,
      role: 'Customer'
    }
  },
  {
    id: 'CM-003',
    ticketId: 'TK-002',
    content: 'I\'ve checked the email server and it appears to be running normally. Could you please restart your Outlook and try again?',
    author: 'Alex Johnson',
    createdAt: '2023-06-15T10:45:00Z',
    user: {
      id: 'USER-004',
      name: 'Alex Johnson',
      avatar: undefined,
      role: 'Support Agent'
    }
  },
  {
    id: 'CM-004',
    ticketId: 'TK-003',
    content: 'We\'re waiting for license approval from your department head. The request is on hold until then.',
    author: 'Michael Brown',
    createdAt: '2023-06-15T09:20:00Z',
    user: {
      id: 'USER-006',
      name: 'Michael Brown',
      avatar: undefined,
      role: 'Support Agent'
    }
  },
  {
    id: 'CM-005',
    ticketId: 'TK-004',
    content: 'This issue has been escalated to the network team for immediate attention. They will be visiting the marketing department shortly.',
    author: 'David Wilson',
    createdAt: '2023-06-15T11:30:00Z',
    user: {
      id: 'USER-008',
      name: 'David Wilson',
      avatar: undefined,
      role: 'Support Manager'
    }
  }
];

// Define mock data for knowledge articles
// export const mockKnowledgeArticles = [
//   {
//     id: "kb-001",
//     title: "How to Reset Your Password",
//     content: `<p>If you've forgotten your password, follow these steps to reset it:</p>
//     <ol>
//       <li>Go to the login page and click "Forgot Password"</li>
//       <li>Enter your email address associated with your account</li>
//       <li>Check your email for a password reset link</li>
//       <li>Click the link and follow the instructions to create a new password</li>
//       <li>Log in with your new password</li>
//     </ol>
//     <p>If you don't receive the email within a few minutes, check your spam folder or contact support.</p>`,
//     category: "access",
//     tags: ["password", "login", "account"],
//     createdAt: "2023-05-15T10:30:00Z",
//     updatedAt: "2023-06-02T14:15:00Z",
//     author: {
//       id: "u3",
//       name: "Alex Johnson",
//       avatar: "/placeholder.svg"
//     },
//     helpfulCount: 156,
//     viewCount: 2340,
//     commentsCount: 5
//   },
//   {
//     id: "kb-002",
//     title: "Troubleshooting Network Connectivity Issues",
//     content: `<p>If you're experiencing network connectivity problems, try these steps:</p>
//     <h3>Basic Troubleshooting</h3>
//     <ol>
//       <li>Restart your computer and router</li>
//       <li>Check if other devices can connect to the same network</li>
//       <li>Verify that your network cable is properly connected (for wired connections)</li>
//       <li>Ensure Wi-Fi is enabled on your device</li>
//     </ol>
//     <h3>Advanced Troubleshooting</h3>
//     <ol>
//       <li>Run network diagnostics: On Windows, open Command Prompt and type "ipconfig /all"</li>
//       <li>Try resetting your TCP/IP stack: On Windows, run "netsh winsock reset" and "netsh int ip reset"</li>
//       <li>Check for IP address conflicts</li>
//       <li>Contact IT support if problems persist</li>
//     </ol>`,
//     category: "network",
//     tags: ["network", "connectivity", "troubleshooting", "internet"],
//     createdAt: "2023-04-20T09:45:00Z",
//     updatedAt: "2023-07-12T11:20:00Z",
//     author: {
//       id: "u5",
//       name: "Michael Brown",
//       avatar: "/placeholder.svg"
//     },
//     helpfulCount: 237,
//     viewCount: 4120,
//     commentsCount: 12
//   },
//   {
//     id: "kb-003",
//     title: "Installing Software on Company Devices",
//     content: `<p>Follow these guidelines when installing software on company devices:</p>
//     <h3>Approved Software</h3>
//     <p>Only approved software from the company software catalog can be installed. This ensures compatibility and security.</p>
//     <h3>How to Install Software</h3>
//     <ol>
//       <li>Visit the software catalog page on the company intranet</li>
//       <li>Find the software you need and click the "Install" button</li>
//       <li>Follow the on-screen instructions to complete the installation</li>
//     </ol>
//     <h3>Requesting New Software</h3>
//     <p>If you need new software that is not on the approved list, please submit a request to the IT department.</p>`,
//     category: "software",
//     tags: ["installation", "software", "guideline", "it"],
//     createdAt: "2023-05-01T13:00:00Z",
//     updatedAt: "2023-06-10T15:30:00Z",
//     author: {
//       id: "u7",
//       name: "David Wilson",
//       avatar: "/placeholder.svg"
//     },
//     helpfulCount: 88,
//     viewCount: 1520,
//     commentsCount: 3
//   }
// ];

// // Define sample users with roles
// export const mockUsers = [
//   {
//     id: 'USER-001',
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     avatar: undefined,
//     role: 'Customer'
//   },
//   {
//     id: 'USER-002',
//     name: 'Jane Smith',
//     email: 'jane.smith@example.com',
//     avatar: undefined,
//     role: 'Support Agent'
//   },
//   {
//     id: 'USER-003',
//     name: 'Sarah Williams',
//     email: 'sarah.williams@example.com',
//     avatar: undefined,
//     role: 'Customer'
//   },
//   {
//     id: 'USER-004',
//     name: 'Alex Johnson',
//     email: 'alex.johnson@example.com',
//     avatar: undefined,
//     role: 'Support Agent'
//   },
//   {
//     id: 'USER-005',
//     name: 'Emily Davis',
//     email: 'emily.davis@example.com',
//     avatar: undefined,
//     role: 'Customer'
//   }
// ];


export const mockKnowledgeArticles = [
  {
    id: "kb-001",
    title: "How to Reset Your Password",
    content: `<p>If you've forgotten your password, follow these steps to reset it:</p>
    <ol>
      <li>Go to the login page and click "Forgot Password"</li>
      <li>Enter your email address associated with your account</li>
      <li>Check your email for a password reset link</li>
      <li>Click the link and follow the instructions to create a new password</li>
      <li>Log in with your new password</li>
    </ol>
    <p>If you don't receive the email within a few minutes, check your spam folder or contact support.</p>`,
    category: "access",
    tags: ["password", "login", "account"],
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-06-02T14:15:00Z",
    author: {
      id: "u3",
      name: "Alex Johnson",
      avatar: "/placeholder.svg"
    },
    helpfulCount: 156,
    viewCount: 2340,
    commentsCount: 5
  },
  {
    id: "kb-002",
    title: "Troubleshooting Network Connectivity Issues",
    content: `<p>If you're experiencing network connectivity problems, try these steps:</p>
    <h3>Basic Troubleshooting</h3>
    <ol>
      <li>Restart your computer and router</li>
      <li>Check if other devices can connect to the same network</li>
      <li>Verify that your network cable is properly connected (for wired connections)</li>
      <li>Ensure Wi-Fi is enabled on your device</li>
    </ol>
    <h3>Advanced Troubleshooting</h3>
    <ol>
      <li>Run network diagnostics: On Windows, open Command Prompt and type "ipconfig /all"</li>
      <li>Try resetting your TCP/IP stack: On Windows, run "netsh winsock reset" and "netsh int ip reset"</li>
      <li>Check for IP address conflicts</li>
      <li>Contact IT support if problems persist</li>
    </ol>`,
    category: "network",
    tags: ["network", "connectivity", "troubleshooting", "internet"],
    createdAt: "2023-04-20T09:45:00Z",
    updatedAt: "2023-07-12T11:20:00Z",
    author: {
      id: "u5",
      name: "Michael Brown",
      avatar: "/placeholder.svg"
    },
    helpfulCount: 237,
    viewCount: 4120,
    commentsCount: 12
  },
  {
    id: "kb-003",
    title: "Installing Software on Company Devices",
    content: `<p>Follow these guidelines when installing software on company devices:</p>
    <h3>Approved Software</h3>
    <p>Only approved software from the company software catalog can be installed. This ensures security and compatibility with our systems.</p>
    <h3>Installation Process</h3>
    <ol>
      <li>Check the software catalog for approved applications</li>
      <li>Submit a request through the IT portal if the software you need is not listed</li>
      <li>Once approved, download the software from the company software center</li>
      <li>Follow the installation instructions provided by IT</li>
    </ol>
    <p>Installing unauthorized software may lead to security vulnerabilities and is against company policy.</p>`,
    category: "software",
    tags: ["software", "installation", "policy", "security"],
    createdAt: "2023-03-10T13:20:00Z",
    updatedAt: "2023-08-05T16:45:00Z",
    author: {
      id: "u2",
      name: "Jane Smith",
      avatar: "/placeholder.svg"
    },
    helpfulCount: 183,
    viewCount: 2890,
    commentsCount: 7
  },
  {
    id: "kb-004",
    title: "Setting Up Multi-Factor Authentication",
    content: `<p>Multi-Factor Authentication (MFA) adds an extra layer of security to your account. Here's how to set it up:</p>
    <h3>Steps to Enable MFA</h3>
    <ol>
      <li>Go to your account settings</li>
      <li>Select "Security" or "Security Settings"</li>
      <li>Find the MFA/2FA option and click "Enable" or "Set up"</li>
      <li>Choose your preferred second factor method (mobile app, SMS, or hardware key)</li>
      <li>Follow the on-screen instructions to complete the setup</li>
    </ol>
    <h3>Recommended MFA Apps</h3>
    <ul>
      <li>Microsoft Authenticator</li>
      <li>Google Authenticator</li>
      <li>Authy</li>
    </ul>
    <p>Remember to save your backup codes in a secure location in case you lose access to your authentication device.</p>`,
    category: "access",
    tags: ["security", "mfa", "authentication", "account"],
    createdAt: "2023-06-25T08:30:00Z",
    updatedAt: "2023-09-18T10:15:00Z",
    author: {
      id: "u1",
      name: "John Doe",
      avatar: "/placeholder.svg"
    },
    helpfulCount: 205,
    viewCount: 3150,
    commentsCount: 9
  },
  {
    id: "kb-005",
    title: "Using the Company VPN",
    content: `<p>The company VPN allows secure access to internal resources when working remotely. Follow these instructions to connect:</p>
    <h3>First-time Setup</h3>
    <ol>
      <li>Download the VPN client from the IT portal</li>
      <li>Install the application following the provided instructions</li>
      <li>Launch the VPN client</li>
      <li>Enter your company credentials when prompted</li>
    </ol>
    <h3>Connecting to the VPN</h3>
    <ol>
      <li>Open the VPN client</li>
      <li>Select the appropriate connection profile (usually "Company-VPN")</li>
      <li>Click "Connect"</li>
      <li>Enter your credentials and complete any MFA challenges</li>
    </ol>
    <p>If you experience connection issues, ensure you have a stable internet connection and try again. For persistent problems, contact IT support.</p>`,
    category: "network",
    tags: ["vpn", "remote", "connectivity", "security"],
    createdAt: "2023-07-08T15:40:00Z",
    updatedAt: "2023-10-22T09:30:00Z",
    author: {
      id: "u4",
      name: "Sarah Wilson",
      avatar: "/placeholder.svg"
    },
    helpfulCount: 176,
    viewCount: 2780,
    commentsCount: 6
  },
  {
    id: "kb-006",
    title: "Printer Setup and Troubleshooting",
    content: `<p>This guide covers common printer setup procedures and troubleshooting steps:</p>
    <h3>Adding a Network Printer</h3>
    <ol>
      <li>Go to Settings > Devices > Printers & scanners</li>
      <li>Click "Add a printer or scanner"</li>
      <li>Select your printer from the list of available devices</li>
      <li>Follow the on-screen instructions to complete the setup</li>
    </ol>
    <h3>Common Printing Issues</h3>
    <ul>
      <li><strong>Printer Offline:</strong> Check physical connections and ensure the printer is powered on</li>
      <li><strong>Print Queue Stuck:</strong> Restart the print spooler service or restart your computer</li>
      <li><strong>Poor Print Quality:</strong> Run printer maintenance tools or replace ink/toner</li>
      <li><strong>Paper Jams:</strong> Carefully remove jammed paper following printer manual instructions</li>
    </ul>
    <p>For advanced printer issues, submit a support ticket with details of the problem.</p>`,
    category: "hardware",
    tags: ["printer", "hardware", "troubleshooting", "setup"],
    createdAt: "2023-08-15T11:25:00Z",
    updatedAt: "2023-11-30T14:10:00Z",
    author: {
      id: "u3",
      name: "Alex Johnson",
      avatar: "/placeholder.svg"
    },
    helpfulCount: 192,
    viewCount: 3050,
    commentsCount: 8
  },
  {
    id: "kb-007",
    title: "Company Email Best Practices",
    content: `<p>Follow these best practices when using your company email:</p>
    <h3>Security Guidelines</h3>
    <ul>
      <li>Never share your email password with anyone</li>
      <li>Be cautious with email attachments, especially from unknown senders</li>
      <li>Report suspicious emails to IT security immediately</li>
      <li>Use different passwords for your email and other accounts</li>
    </ul>
    <h3>Email Etiquette</h3>
    <ul>
      <li>Use professional language and tone</li>
      <li>Include a clear subject line</li>
      <li>Use the CC field appropriately and avoid Reply All unless necessary</li>
      <li>Include your standard signature in all external communications</li>
    </ul>
    <p>Remember that all company email communications may be monitored and should comply with company policies.</p>`,
    category: "general",
    tags: ["email", "security", "communication", "policy"],
    createdAt: "2023-09-20T10:15:00Z",
    updatedAt: "2024-01-05T13:40:00Z",
    author: {
      id: "u5",
      name: "Michael Brown",
      avatar: "/placeholder.svg"
    },
    helpfulCount: 164,
    viewCount: 2430,
    commentsCount: 5
  },
  {
    id: "kb-008",
    title: "Mobile Device Management (MDM) Guide",
    content: `<p>Our company uses Mobile Device Management (MDM) to secure and manage company data on mobile devices. This guide explains key MDM concepts and procedures:</p>
    <h3>Enrolling Your Device</h3>
    <ol>
      <li>Download the MDM app from your device's app store</li>
      <li>Open the app and enter your company email</li>
      <li>Follow the on-screen instructions to complete enrollment</li>
      <li>Accept all requested permissions</li>
    </ol>
    <h3>MDM Features and Policies</h3>
    <ul>
      <li><strong>Remote Wipe:</strong> IT can remotely erase company data from your device if lost or stolen</li>
      <li><strong>App Management:</strong> Required apps may be automatically installed</li>
      <li><strong>Security Policies:</strong> Device passcode requirements and encryption are enforced</li>
      <li><strong>Container Separation:</strong> Work data is kept separate from personal data</li>
    </ul>
    <p>If you have questions about MDM or need help with enrollment, contact the IT helpdesk.</p>`,
    category: "mobile",
    tags: ["mobile", "mdm", "security", "byod"],
    createdAt: "2023-10-12T14:50:00Z",
    updatedAt: "2024-02-20T11:35:00Z",
    author: {
      id: "u2",
      name: "Jane Smith",
      avatar: "/placeholder.svg"
    },
    helpfulCount: 148,
    viewCount: 2180,
    commentsCount: 4
  }
];
