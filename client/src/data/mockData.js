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
    <p>Only approved software from the company software catalog can be installed. This ensures compatibility and security.</p>
    <h3>How to Install Software</h3>
    <ol>
      <li>Visit the software catalog page on the company intranet</li>
      <li>Find the software you need and click the "Install" button</li>
      <li>Follow the on-screen instructions to complete the installation</li>
    </ol>
    <h3>Requesting New Software</h3>
    <p>If you need new software that is not on the approved list, please submit a request to the IT department.</p>`,
    category: "software",
    tags: ["installation", "software", "guideline", "it"],
    createdAt: "2023-05-01T13:00:00Z",
    updatedAt: "2023-06-10T15:30:00Z",
    author: {
      id: "u7",
      name: "David Wilson",
      avatar: "/placeholder.svg"
    },
    helpfulCount: 88,
    viewCount: 1520,
    commentsCount: 3
  }
];

// Define sample users with roles
export const mockUsers = [
  {
    id: 'USER-001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: undefined,
    role: 'Customer'
  },
  {
    id: 'USER-002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: undefined,
    role: 'Support Agent'
  },
  {
    id: 'USER-003',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    avatar: undefined,
    role: 'Customer'
  },
  {
    id: 'USER-004',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: undefined,
    role: 'Support Agent'
  },
  {
    id: 'USER-005',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    avatar: undefined,
    role: 'Customer'
  }
];
