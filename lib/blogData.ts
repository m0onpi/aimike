// data/blogData.ts

export interface BlogPost {
    id: string;
    title: string;
    summary: string;
    content: string;
    date: string;
    slug: string;
  }
  
  export const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Sending SMS Messages with Termux on Android',
      summary:
        'Unlock the power of the command line on your Android device to send SMS messages using Termux.',
      content: `
  ## Introduction
  
  In this blog post, we'll explore how to use **Termux** on your Android device to send SMS messages using your own phone number. Termux is a powerful terminal emulator and Linux environment app that brings the power of the command line to your mobile device.
  
  ## Prerequisites
  
  - An Android device with an active SIM card and SMS capabilities.
  - Installation of Termux and Termux:API from F-Droid.
  - Basic knowledge of command-line operations.
  
  ## Step 1: Install Termux and Termux:API
  
  Since the Google Play Store versions are outdated, install both apps from F-Droid to get the latest updates.
  
  1. Install F-Droid by downloading it from [https://f-droid.org/](https://f-droid.org/).
  2. Open F-Droid and search for "Termux" and "Termux:API".
  3. Install both applications.
  
  ## Step 2: Set Up Termux
  
  Open Termux and update the package lists:
  
  \`\`\`bash
  pkg update && pkg upgrade
  pkg install termux-api
  \`\`\`
  
  ## Step 3: Grant Necessary Permissions
  
  Termux needs permission to send SMS messages. Grant permissions by going to your device's settings:
  
  1. Navigate to **Settings > Apps > Termux > Permissions**.
  2. Enable the **SMS** permission.
  
  ## Step 4: Send an SMS Message
  
  Use the following command to send an SMS message:
  
  \`\`\`bash
  termux-sms-send -n +1234567890 "Hello from Termux!"
  \`\`\`
  
  Replace \`+1234567890\` with the recipient's phone number and customize the message as needed.
  
  ## Step 5: Automate SMS Sending with a Script
  
  Create a script to automate the process:
  
  \`\`\`bash
  #!/bin/bash
  RECIPIENT="+1234567890"
  MESSAGE="This is an automated message from Termux."
  
  termux-sms-send -n "$RECIPIENT" "$MESSAGE"
  \`\`\`
  
  Save this script as \`send_sms.sh\`, make it executable with \`chmod +x send_sms.sh\`, and run it using \`./send_sms.sh\`.
  
  ## Limitations and Considerations
  
  - **Android Version Compatibility:** Some features may not work on newer Android versions due to security restrictions.
  - **Permissions:** Ensure that Termux has all the necessary permissions, especially for SMS and storage.
  - **Carrier Restrictions:** Be aware of any limitations imposed by your mobile carrier regarding SMS sending.
  
  ## Troubleshooting
  
  If you encounter issues:
  
  - Double-check that all permissions are granted.
  - Ensure your SIM card is active and has sufficient balance.
  - Verify that you're using the correct phone number format.
  
  ## Conclusion
  
  With Termux and Termux:API, you can leverage the power of the Linux command line on your Android device to send SMS messages. This can be particularly useful for automation tasks, alerts, or integrating SMS functionality into your scripts.
  
  Stay tuned for more tutorials and tips on maximizing your productivity with Termux!
  `,
      date: '2023-10-01',
      slug: 'sending-sms-with-termux',
    },
    // Add more blog posts here
  ];
  