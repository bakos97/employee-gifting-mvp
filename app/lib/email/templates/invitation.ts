interface InvitationEmailParams {
  recipientFirstName: string;
  employeeName: string;
  celebrationType: string;
  contributeUrl: string;
}

export function getInvitationEmailSubject(employeeName: string): string {
  return `Del dine hilsener til ${employeeName}!`;
}

export function getInvitationEmailHtml(params: InvitationEmailParams): string {
  const { recipientFirstName, employeeName, celebrationType, contributeUrl } = params;

  return `<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Del dine hilsener til ${employeeName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAF8F5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAF8F5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width: 560px; width: 100%;">
          <!-- Header -->
          <tr>
            <td style="padding-bottom: 32px; text-align: center;">
              <div style="width: 48px; height: 48px; margin: 0 auto 16px; background-color: #D4950A; border-radius: 12px; line-height: 48px; text-align: center;">
                <span style="font-size: 22px;">&#9993;</span>
              </div>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td style="background-color: #FFFFFF; border-radius: 16px; border: 1px solid #E8E4DF; padding: 40px 36px;">
              <!-- Greeting -->
              <h1 style="margin: 0 0 8px; font-family: Georgia, 'Times New Roman', serif; font-size: 24px; font-weight: 700; color: #1C2333;">
                Hei ${recipientFirstName}!
              </h1>

              <div style="width: 40px; height: 2px; background-color: #D4950A; margin: 16px 0 24px;"></div>

              <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.7; color: #4A4A4A;">
                Vi samler inn hilsener og minner til <strong style="color: #1C2333;">${employeeName}</strong> i anledning ${celebrationType}.
              </p>

              <p style="margin: 0 0 28px; font-size: 15px; line-height: 1.7; color: #4A4A4A;">
                Dine ord betyr mye &mdash; ta et par minutter og del dine tanker.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td style="background-color: #D4950A; border-radius: 12px;">
                    <a href="${contributeUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; font-size: 15px; font-weight: 600; color: #FFFFFF; text-decoration: none;">
                      Del dine hilsener
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0; font-size: 13px; line-height: 1.6; color: #8A8A8A; text-align: center;">
                Du kan skrive en personlig hilsen, dele minner, og laste opp bilder.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top: 28px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #A0A0A0;">
                Denne e-posten ble sendt automatisk.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
