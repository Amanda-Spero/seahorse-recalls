// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const sgMail = require('@sendgrid/mail');
const { sendgrid } = require('../config/config');

sgMail.setApiKey(sendgrid);

exports.sendWelcome = (email, firstName) => {

  const template =
`
<h2> Hello ${firstName}</h2>
<br>
<p>Welcome to Seahorse Recalls!</p>
<br>
<p>You can set your saved searches and manage your account any time at <a href="https://seahorse-team-project.herokuapp.com/Account">Seahorse Account</a></p>
`;

  const msg = {
    to: email,
    from: 'mail@seahorse-team-project.herokuapp.com',
    subject: 'Welcome to Seahorse',
    html: template,
  };


  sgMail.send(msg);
};
