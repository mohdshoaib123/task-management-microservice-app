export const  generateOTP=():string=>{
  return  Math.floor(100000+Math.random()*900000).toString()
}

export const getOtpHtml = (
  otp: string,
  expiryMinutes = 5
): string => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your Email</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 20px;">

          <table width="600" cellpadding="0" cellspacing="0"
                 style="background:#ffffff;border-radius:8px;padding:40px;">

            <tr>
              <td align="center">
                <h2 style="margin:0;color:#333;">
                  Verify Your Email
                </h2>

                <p style="margin-top:20px;color:#555;font-size:16px;">
                  Use the following One-Time Password (OTP) to verify your email address.
                </p>

                <div
                  style="
                    display:inline-block;
                    margin:25px 0;
                    padding:15px 30px;
                    font-size:32px;
                    font-weight:bold;
                    letter-spacing:8px;
                    background:#f3f3f3;
                    border-radius:6px;
                    color:#2563eb;
                  "
                >
                  ${otp}
                </div>

                <p style="color:#666;font-size:14px;">
                  This OTP will expire in <strong>${expiryMinutes} minutes</strong>.
                </p>

                <p style="margin-top:30px;color:#888;font-size:14px;">
                  If you didn't request this verification, you can safely ignore this email.
                </p>

                <hr style="margin:35px 0;border:none;border-top:1px solid #eee;" />

                <p style="font-size:13px;color:#999;">
                  © ${new Date().getFullYear()} Task App. All rights reserved.
                </p>

              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};