# EmailJS Setup Guide for Portfolio Contact Form

This guide will help you set up EmailJS to enable the contact form on your portfolio website.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add an Email Service

1. After logging in, go to the **Email Services** page
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. **Copy the Service ID** (you'll need this later)

## Step 3: Create an Email Template

1. Go to the **Email Templates** page
2. Click "Create New Template"
3. **IMPORTANT**: Configure the template settings:
   - **To Email**: `vishalvoweldas67@gmail.com` (your email where you want to receive messages)
   - **From Name**: `{{from_name}}` (this will show the sender's name)
   - **Reply To**: `{{from_email}}` (this allows you to reply directly to the sender)
   
4. Use this template structure for the email body:

```
Subject: New Portfolio Contact: {{from_name}}

You received a new message from your portfolio contact form!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FROM: {{from_name}}
EMAIL: {{from_email}}

MESSAGE:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply directly to this email to respond to {{from_name}}.
```

5. **Important**: Make sure your template uses these variable names:
   - `{{from_name}}` - sender's name
   - `{{from_email}}` - sender's email address
   - `{{message}}` - the message content

6. **Copy the Template ID** (you'll need this later)

### Why This Matters:
- **To Email**: Your email (where messages are delivered)
- **From Name**: Shows who sent the message
- **Reply To**: When you hit "Reply", it goes to the sender's email, not yours!

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (it looks like a random string)
3. **Copy the Public Key**

## Step 5: Update Your Portfolio Files

### Update `index.html`

Find this line in the `<head>` section:

```javascript
emailjs.init('YOUR_PUBLIC_KEY');
```

Replace `'YOUR_PUBLIC_KEY'` with your actual Public Key from Step 4:

```javascript
emailjs.init('your_actual_public_key_here');
```

### Update `script.js`

Find these lines in the contact form section:

```javascript
const serviceID = 'YOUR_SERVICE_ID';  // Replace with your EmailJS Service ID
const templateID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS Template ID
```

Replace them with your actual IDs from Steps 2 and 3:

```javascript
const serviceID = 'service_abc123';  // Your actual Service ID
const templateID = 'template_xyz789'; // Your actual Template ID
```

## Step 6: Test Your Contact Form

1. Open your portfolio website (`index.html`)
2. Scroll to the Contact section
3. Fill out the form with test data
4. Click "Send Message"
5. Check your email inbox for the test message

## Troubleshooting

### Form not sending?
- Check the browser console (F12) for errors
- Verify all three IDs are correct (Public Key, Service ID, Template ID)
- Make sure your EmailJS account is verified
- Check that your email service is properly connected

### Not receiving emails?
- Check your spam/junk folder
- Verify the email template is set up correctly
- Make sure the "To Email" in your EmailJS service settings is correct

### Rate Limiting
- EmailJS free plan allows 200 emails/month
- If you exceed this, consider upgrading or using a different service

## Example Configuration

Here's what your configuration should look like after setup:

**In `index.html`:**
```javascript
emailjs.init('xYz123AbC456DeF789');
```

**In `script.js`:**
```javascript
const serviceID = 'service_abc1234';
const templateID = 'template_xyz5678';
```

## Security Note

Your Public Key is safe to expose in client-side code. However, never share your Private Key or API Secret Key publicly.

## Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Dashboard](https://dashboard.emailjs.com/)
- [EmailJS Support](https://www.emailjs.com/support/)

---

Once you've completed these steps, your contact form will be fully functional and visitors can send you messages directly from your portfolio!
