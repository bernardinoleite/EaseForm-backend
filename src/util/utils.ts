// Ícones por campo
export const getIcon = (key: string) => {
    const lowerKey = key.toLowerCase();
    if (lowerKey.includes("name")) return "fa-user";
    if (lowerKey.includes("email")) return "fa-envelope";
    if (lowerKey.includes("phone") || lowerKey.includes("tel")) return "fa-phone";
    if (lowerKey.includes("message") || lowerKey.includes("comment")) return "fa-comment";
    if (lowerKey.includes("subject")) return "fa-tag";
    return "fa-circle-dot";
};


export function returnHtml({ origin, fieldsHTML }) {
    const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <title>EaseForm</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 20px; }
            .gradient-bg { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); }
            .header, .footer-cta, .footer { padding: 16px; border-radius: 12px; color: white; }
            .header { background-color: #6366f1; }
            .field-card { background-color: #f9fafb; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 12px; }
            .field-card h3 { margin: 0; font-size: 16px; color: #1f2937; }
            .field-card p { margin: 4px 0 0; color: #4b5563; }
            .link-box { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 12px; margin: 20px 0; }
            .footer-cta { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); text-align: center; }
        </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    </head>
    <body>
        <div style="max-width: 600px; margin: auto;">
            <div class="header">
                <h1>📬 Formulário Recebido</h1>
                <p>Você recebeu um novo envio via EaseForm</p>
            </div>

            <div style="margin: 20px 0;">
                ${fieldsHTML}
            </div>

            <div class="link-box">
                <p><strong>🔗 Enviado de:</strong> <a href="${origin}">${origin}</a></p>
            </div>

            <div class="footer" style="background-color: #1f2937; text-align: center; font-size: 12px;">
                <p>© 2023 EaseForm. Todos os direitos reservados.</p>
                <p>Este é um email automático, por favor não responda.</p>
            </div>
        </div>
    </body>
    </html>
    `;
    return html;
}


export function fieldsHTML(body: any) {
    return Object.entries(body).map(([key, value]) => {
        const label = key.replace(/_/g, " ").replace(/^\w/, c => c.toUpperCase());
        const icon = getIcon(key);
        return `
        <div class="field-card bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div class="flex items-start">
                <div class="gradient-bg text-white p-2 rounded-lg mr-3 flex-shrink-0">
                    <i class="fas ${icon} text-sm"></i>
                </div>
                <div>
                    <h3 class="font-bold text-gray-700">${label}</h3>
                    <p class="text-gray-600">${value}</p>
                </div>
            </div>
        </div>`;
    }).join("\n");
}

export function registerHtml({ easeId, email, endPoint }) {
    return `
  <html lang="pt-BR">
    <body style="font-family: sans-serif; background-color: #f9fafb; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
        
        <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 24px;">
          <h1 style="margin: 0; font-size: 24px;">EaseForm</h1>
          <p style="margin: 4px 0 0;">Registro de Email</p>
        </div>

        <div style="padding: 24px;">
          <h2 style="color: #1f2937;">📥 Email Registrado com Sucesso</h2>

          <p><strong>Seu EndPoint:</strong> ${endPoint}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>EaseId:</strong> ${easeId}</p>

          <div style="margin-top: 24px; text-align: center;">
            <a href="https://easeform.onrender.com" style="background-color: #6366f1; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">Ir para o site</a>
          </div>
        </div>

        <div style="background: #1f2937; color: #9ca3af; padding: 16px; text-align: center; font-size: 12px;">
          <p>© 2025 EaseForm. Todos os direitos reservados.</p>
          <p>Este é um registro automático, por favor não responda.</p>
        </div>

      </div>
    </body>
  </html>
  `;
}
