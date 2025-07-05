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
    return `<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Registrado com Sucesso | EaseForm</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <style>
        .gradient-bg {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        }

        .header-divider {
            height: 4px;
            background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
        }

        .field-card {
            transition: all 0.3s ease;
        }

        .field-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
    </style>
</head>

<body class="font-sans bg-gray-50">
    <div class="max-w-2xl mx-auto my-8 bg-white rounded-xl overflow-hidden shadow-lg">
        <!-- Header -->
        <div class="gradient-bg text-white p-6">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <div class="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
                        <i class="fas fa-check text-xl"></i>
                    </div>
                    <h1 class="text-2xl font-bold">EaseForm</h1>
                </div>
                <div class="text-white bg-black bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                    <i class="fas fa-user-check mr-1"></i> Registro de Email
                </div>
            </div>
        </div>
        <div class="header-divider"></div>

        <!-- Content -->
        <div class="p-6">
            <div class="flex items-center mb-6">
                <div class="gradient-bg text-white p-3 rounded-lg mr-4">
                    <i class="fas fa-envelope-open-text text-xl"></i>
                </div>
                <h2 class="text-2xl font-bold text-gray-800">📥 Email Registrado com Sucesso</h2>
            </div>

            <!-- Fields -->
               <div class="mb-8 grid grid-cols-1 gap-4">
                <div class="field-card bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div class="flex items-start">
                        <div class="gradient-bg text-white p-2 rounded-lg mr-3 flex-shrink-0">
                            <i class="fas fa-envelope text-sm"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-700">Seu EndPoint</h3>
                            <p class="text-gray-600" id="email">${endPoint}</p>
                        </div>
                    </div>
                </div>

            <div class="mb-8 grid grid-cols-1 gap-4">
                <div class="field-card bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div class="flex items-start">
                        <div class="gradient-bg text-white p-2 rounded-lg mr-3 flex-shrink-0">
                            <i class="fas fa-envelope text-sm"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-700">Email</h3>
                            <p class="text-gray-600" id="email">${email}</p>
                        </div>
                    </div>
                </div>

                <div class="field-card bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div class="flex items-start">
                        <div class="gradient-bg text-white p-2 rounded-lg mr-3 flex-shrink-0">
                            <i class="fas fa-key text-sm"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-700">${easeId}</h3>
                            <p class="text-gray-600" id="easeId">carregando...</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Call to Action -->
            <div class="gradient-bg text-white p-6 rounded-lg text-center">
                <h3 class="text-xl font-bold mb-2">Bem-vindo ao EaseForm!</h3>
                <p class="mb-4 opacity-90">Agora você pode usar este email para receber formulários.</p>
                <a href="https://easeform.onrender.com"
                    class="inline-block bg-white text-primary font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition">
                    Ir para o Site
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div class="bg-gray-800 text-gray-400 p-6 text-center text-sm">
            <p class="mb-2">© 2025 EaseForm. Todos os direitos reservados.</p>
            <p class="text-xs">Este é um registro automático, por favor não responda.</p>
        </div>
    </div>

    <script>
        // Simulação dinâmica (troque por dados server-side se necessário)
        const params = new URLSearchParams(window.location.search);
        document.getElementById("email").textContent = params.get("email") || "não informado";
        document.getElementById("easeId").textContent = params.get("easeId") || "não informado";
    </script>
</body>

</html>`
}