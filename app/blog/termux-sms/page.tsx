'use client';
import Layout from "@/app/layout";

export default function BlogPage() {

  return (
    <Layout>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold">
            Sending SMS Messages with Termux on Android
          </h1>
          <p className="mt-4 text-lg">
            Unlock the power of the command line on your Android device to send SMS messages using Termux.
          </p>
        </div>
        <div className="mt-8 space-y-6 bg-white p-6 rounded-lg shadow-lg text-gray-900">
          <h2 className="text-2xl font-bold">Introduction</h2>
          <p className="mt-4">
            In this blog post, we&apos;ll explore how to use <strong>Termux</strong> on your Android device to send SMS messages using your own phone number. Termux is a powerful terminal emulator and Linux environment app that brings the power of the command line to your mobile device.
          </p>

          <h2 className="text-2xl font-bold mt-8">Prerequisites</h2>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>An Android device with an active SIM card and SMS capabilities.</li>
            <li>Installation of Termux and Termux:API from F-Droid.</li>
            <li>Basic knowledge of command-line operations.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">Step 1: Install Termux and Termux:API</h2>
          <p className="mt-4">
            Since the Google Play Store versions are outdated, install both apps from F-Droid to get the latest updates.
          </p>
          <ol className="list-decimal list-inside space-y-2 mt-4">
            <li>
              Install F-Droid by downloading it from{' '}
              <a
                href="https://f-droid.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline"
              >
                https://f-droid.org/
              </a>
              .
            </li>
            <li>Open F-Droid and search for &quot;Termux&quot; and &quot;Termux:API&quot;.</li>
            <li>Install both applications.</li>
          </ol>

          <h2 className="text-2xl font-bold mt-8">Step 2: Set Up Termux</h2>
          <p className="mt-4">Open Termux and update the package lists:</p>
          <pre className="bg-gray-100 p-4 rounded mt-4 overflow-x-auto">
            <code>
              pkg update && pkg upgrade{'\n'}pkg install termux-api
            </code>
          </pre>

          <h2 className="text-2xl font-bold mt-8">Step 3: Grant Necessary Permissions</h2>
          <p className="mt-4">
            Termux needs permission to send SMS messages. Grant permissions by going to your device&apos;s settings:
          </p>
          <ol className="list-decimal list-inside space-y-2 mt-4">
            <li>
              Navigate to <strong>Settings &gt; Apps &gt; Termux &gt; Permissions</strong>.
            </li>
            <li>Enable the <strong>SMS</strong> permission.</li>
          </ol>

          <h2 className="text-2xl font-bold mt-8">Step 4: Send an SMS Message</h2>
          <p className="mt-4">Use the following command to send an SMS message:</p>
          <pre className="bg-gray-100 p-4 rounded mt-4 overflow-x-auto">
            <code>
              termux-sms-send -n +1234567890 &quot;Hello from Termux!&quot;
            </code>
          </pre>
          <p className="mt-4">
            Replace <code>+1234567890</code> with the recipient&apos;s phone number and customize the message as needed.
          </p>

          <h2 className="text-2xl font-bold mt-8">Step 5: Automate SMS Sending with a Script</h2>
          <p className="mt-4">Create a script to automate the process:</p>
          <pre className="bg-gray-100 p-4 rounded mt-4 overflow-x-auto">
            <code>
{`#!/bin/bash
RECIPIENT="+1234567890"
MESSAGE="This is an automated message from Termux."

termux-sms-send -n "$RECIPIENT" "$MESSAGE"`}
            </code>
          </pre>
          <p className="mt-4">
            Save this script as <code>send_sms.sh</code>, make it executable with{' '}
            <code>chmod +x send_sms.sh</code>, and run it using <code>./send_sms.sh</code>.
          </p>

          <h2 className="text-2xl font-bold mt-8">Limitations and Considerations</h2>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <strong>Android Version Compatibility:</strong> Some features may not work on newer Android versions due to security restrictions.
            </li>
            <li>
              <strong>Permissions:</strong> Ensure that Termux has all the necessary permissions, especially for SMS and storage.
            </li>
            <li>
              <strong>Carrier Restrictions:</strong> Be aware of any limitations imposed by your mobile carrier regarding SMS sending.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">Troubleshooting</h2>
          <p className="mt-4">If you encounter issues:</p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Double-check that all permissions are granted.</li>
            <li>Ensure your SIM card is active and has sufficient balance.</li>
            <li>Verify that you&apos;re using the correct phone number format.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8">Conclusion</h2>
          <p className="mt-4">
            With Termux and Termux:API, you can leverage the power of the Linux command line on your Android device to send SMS messages. This can be particularly useful for automation tasks, alerts, or integrating SMS functionality into your scripts.
          </p>
          <div className="text-center text-red-500 mt-8">
            <p className="text-xl text-gray">
              Stay tuned for more tutorials and tips on maximizing your productivity with Termux!
            </p>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}
