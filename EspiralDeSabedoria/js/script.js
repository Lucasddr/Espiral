/* ==========================================================================
   SCRIPT.JS — Espiral de Sabedoria
   - Animação de entrada das seções (.container -> .active)
   - Cabeçalho fixo com sombra ao rolar
   - Menu mobile (hambúrguer)
   - Acordeão de Perguntas Frequentes
   - Seletor de idioma PT/ES (i18n simples via data-i18n)
   - Formulários de agendamento e newsletter (validação + feedback)
   ========================================================================== */

(function () {
    "use strict";

    /* ----------------------------------------------------------------
       1. Animação de entrada das seções
       ---------------------------------------------------------------- */
    const containers = document.querySelectorAll(".container");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        containers.forEach((el) => observer.observe(el));
    } else {
        // Fallback: navegadores sem suporte mostram o conteúdo direto
        containers.forEach((el) => el.classList.add("active"));
    }

    /* ----------------------------------------------------------------
       2. Cabeçalho fixo com sombra ao rolar
       ---------------------------------------------------------------- */
    const cabecalho = document.getElementById("cabecalho");

    if (cabecalho) {
        const aoRolar = () => {
            cabecalho.classList.toggle("is-scrolled", window.scrollY > 12);
        };
        aoRolar();
        window.addEventListener("scroll", aoRolar, { passive: true });
    }

    /* ----------------------------------------------------------------
       3. Menu mobile (hambúrguer)
       ---------------------------------------------------------------- */
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    function fecharMenu() {
        menu.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu de navegação");
        document.body.classList.remove("sem-rolagem");
    }

    function abrirMenu() {
        menu.classList.add("is-open");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Fechar menu de navegação");
        document.body.classList.add("sem-rolagem");
    }

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", () => {
            const estaAberto = menu.classList.contains("is-open");
            estaAberto ? fecharMenu() : abrirMenu();
        });

        // Fecha ao clicar em qualquer link do menu
        menu.querySelectorAll(".menu__link").forEach((link) => {
            link.addEventListener("click", (e) => {
                // Pequeno delay para o scroll suave começar antes de fechar
                window.setTimeout(fecharMenu, 80);
            });
        });

        // Fecha ao clicar fora do menu (no overlay do body)
        document.addEventListener("click", (e) => {
            if (
                menu.classList.contains("is-open") &&
                !menu.contains(e.target) &&
                !menuToggle.contains(e.target)
            ) {
                fecharMenu();
            }
        });

        // Fecha com Escape
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && menu.classList.contains("is-open")) {
                fecharMenu();
                menuToggle.focus();
            }
        });
    }

    /* Marca o link do menu correspondente à seção visível */
    const secoes = document.querySelectorAll("main .section[id]");
    const linksMenu = document.querySelectorAll(".menu__link");

    if (secoes.length && linksMenu.length && "IntersectionObserver" in window) {
        const navObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute("id");
                        linksMenu.forEach((link) => {
                            link.classList.toggle(
                                "is-ativo",
                                link.getAttribute("href") === `#${id}`
                            );
                        });
                    }
                });
            },
            { rootMargin: "-45% 0px -45% 0px" }
        );

        secoes.forEach((secao) => navObserver.observe(secao));
    }

    /* ----------------------------------------------------------------
       4. Acordeão de Perguntas Frequentes
       ---------------------------------------------------------------- */
    document.querySelectorAll(".faq-question").forEach((botao) => {
        botao.addEventListener("click", () => {
            const conteudo = document.getElementById(
                botao.getAttribute("aria-controls")
            );
            const aberto = botao.getAttribute("aria-expanded") === "true";

            botao.setAttribute("aria-expanded", String(!aberto));
            if (conteudo) {
                conteudo.classList.toggle("is-aberto", !aberto);
            }
        });
    });

    /* ----------------------------------------------------------------
       5. Seletor de idioma (PT / ES)
       ---------------------------------------------------------------- */
    const dicionario = {
        pt: {
            "nav-inicio": "Início",
            "nav-sobre": "Sobre mim",
            "nav-terapias": "Terapias",
            "nav-cursos": "Cursos",
            "nav-faq": "FAQ",
            "nav-depoimentos": "Depoimentos",
            "nav-contato": "Contato",

            "hero-etiqueta": "Acompanhamento terapêutico",
            "hero-titulo": 'Acompanhando processos de <em class="destaque">transformação</em> e crescimento pessoal',
            "hero-texto": "Um espaço seguro e acolhedor para você se reconectar consigo mesma, ressignificar histórias e dar os próximos passos com mais clareza, leveza e propósito.",
            "btn-agendar-sessao": "Agendar sessão",
            "btn-conhecer-mais": "Conhecer mais",

            "sobre-etiqueta": "Sobre mim",
            "sobre-titulo": "Um caminho de escuta, presença e transformação",
            "sobre-p1": "Minha jornada de autoconhecimento começou em 2018, em um momento de profunda transformação na minha vida, quando precisei olhar para dentro e encontrar novos caminhos. Foi a partir dessa experiência que nasceu uma busca por compreender mais sobre mim, sobre o ser humano e sobre os processos de evolução pessoal.",
            "sobre-p2": "Ao longo desse caminho, encontrei uma nova forma de enxergar a vida e descobri também o meu propósito: acompanhar outras pessoas em suas próprias jornadas de cura, consciência e transformação. Hoje utilizo ferramentas de sabedoria ancestral e terapias que compreendem o ser humano de forma integral — alma, mente, corpo e emoções.",
            "btn-mais-sobre-mim": "Mais sobre mim",

            "terapias-titulo": "Terapias",
            "terapias-subtitulo": "Cada processo é único. Conheça as abordagens que utilizo para apoiar o seu caminho de cura e autoconhecimento, sempre respeitando o seu ritmo.",
            "terapia1-titulo": "Constelações Familiares na Água",
            "terapia1-texto": "Um processo de consciência sobre a origem dos bloqueios e conflitos, compreendendo dinâmicas familiares e permitindo novas percepções para transformar sua relação consigo mesma e com o mundo.",
            "terapia2-titulo": "Leitura de Registros Akáshicos",
            "terapia2-texto": "Em conexão com seus mestres e guias, essa leitura possibilita acessar mensagens e insights importantes para sua caminhada, trazendo clareza, consciência e direcionamento.",
            "terapia3-titulo": "Tarô Evolutivo, Sistêmico e Transgeracional",
            "terapia3-texto": "Uma ferramenta de autoconhecimento que acessa conteúdos do inconsciente, ajudando a compreender bloqueios, acolher processos e encontrar novos caminhos com mais consciência.",
            "terapia4-titulo": "Reiki",
            "terapia4-texto": "Uma terapia de harmonização energética através da canalização da energia de cura, auxiliando no equilíbrio, relaxamento e apoio em momentos de transformação emocional.",
            "terapia5-titulo": "Pêndulo",
            "terapia5-texto": "Uma ferramenta utilizada para harmonização energética, desbloqueios, limpezas e potencialização de projetos, desejos e ambientes, trazendo equilíbrio para diferentes áreas da vida.",
            "link-saber-mais": "Saber mais",

            "cursos-etiqueta": "Constelações Familiares",
            "cursos-titulo": "Cursos e workshops para o seu desenvolvimento pessoal",
            "cursos-subtitulo" : "Com Especialidade na Água",
            "cursos-texto": "Programas presenciais e online pensados para quem deseja ir além das sessões individuais — ferramentas práticas de autoconhecimento, regulação emocional e conexão espiritual para aplicar no dia a dia.",
            "btn-ver-cursos": "Ver cursos disponíveis",

            "faq-titulo": "Perguntas frequentes",
            "faq-subtitulo": "Tire suas dúvidas antes de iniciar o seu processo terapêutico. Se não encontrar a resposta que procura, fale comigo diretamente.",
            "faq1-pergunta": "Preciso de alguma indicação para iniciar o acompanhamento?",
            "faq1-resposta": "Não. Você pode entrar em contato diretamente comigo, sem necessidade de indicação médica ou psicológica. Na primeira sessão, conversamos sobre o seu momento e definimos juntas o melhor caminho.",
            "faq2-pergunta": "As sessões são online ou presenciais?",
            "faq2-resposta": "Ofereço as duas modalidades. As sessões online acontecem por videochamada, com a mesma qualidade de presença e acolhimento das sessões presenciais.",
            "faq3-pergunta": "Com que frequência devo fazer as sessões?",
            "faq3-resposta": "Cada processo é único. Geralmente recomendo encontros semanais ou quinzenais no início, ajustando a frequência conforme a sua evolução e necessidades.",
            "faq4-pergunta": "O que são as Constelações Familiares?",
            "faq4-resposta": "É uma abordagem que revela dinâmicas e padrões invisíveis transmitidos entre gerações, ajudando a compreender e transformar conflitos que se repetem na sua história.",
            "faq5-pergunta": "Como faço para agendar minha primeira sessão?",
            "faq5-resposta": "Basta preencher o formulário de agendamento abaixo ou enviar uma mensagem pelo WhatsApp. Em poucas horas eu retorno para confirmar o melhor horário para você.",

            "depo-titulo": "Depoimentos",
            "depo-subtitulo": "Histórias reais de pessoas que encontraram um novo olhar sobre si mesmas através do acompanhamento terapêutico.",
            "depo-texto": "As sessões me ajudaram a compreender padrões que eu repetia há anos sem perceber. Hoje me sinto mais leve, presente e em paz com a minha própria história.",
            "depo-nome": "Mariana G.",
            "depo-cargo": "Em acompanhamento desde 2023",

            "agenda-titulo": "Agende sua sessão",
            "agenda-subtitulo": "Escolha o dia e o horário que melhor se encaixam na sua rotina.",
            "label-servico": "Serviço",
            "opt-servico-placeholder": "Selecione um serviço",
            "opt-servico-5": "Sessão de Avaliação",
            "label-data": "Data",
            "label-horario": "Horário",
            "opt-horario-placeholder": "Selecione um horário",
            "opt-horario-1": "Manhã (9h–12h)",
            "opt-horario-2": "Tarde (14h–17h)",
            "opt-horario-3": "Noite (18h–20h)",
            "btn-agendar-agora": "Agendar agora",
            "msg-agendamento-sucesso": "Recebemos sua solicitação! Em breve entraremos em contato para confirmar o horário.",
            "msg-agendamento-erro": "Por favor, preencha todos os campos antes de continuar.",

            "rodape-tagline": "Acompanhamento terapêutico para a sua transformação e crescimento pessoal.",
            "rodape-col-navegacao": "Navegação",
            "rodape-col-terapias": "Terapias",
            "rodape-col-newsletter": "Newsletter",
            "rodape-newsletter-texto": "Receba reflexões, novidades sobre cursos e conteúdos exclusivos diretamente no seu e-mail.",
            "placeholder-email": "Seu e-mail",
            "btn-inscrever": "Inscrever-se",
            "rodape-privacidade": "Política de Privacidade",
            "rodape-termos": "Termos e Condições",
            "rodape-copyright": "© 2026 Espiral de Sabedoria. Todos os direitos reservados.",
            "msg-newsletter-sucesso": "Inscrição realizada com sucesso! Em breve você receberá nossas novidades."
        },
        es: {
            "nav-inicio": "Inicio",
            "nav-sobre": "Sobre mí",
            "nav-terapias": "Terapias",
            "nav-cursos": "Cursos",
            "nav-faq": "FAQ",
            "nav-depoimentos": "Testimonios",
            "nav-contato": "Contacto",

            "hero-etiqueta": "Acompañamiento terapéutico",
            "hero-titulo": 'Acompañando procesos de <em class="destaque">transformación</em> y crecimiento personal',
            "hero-texto": "Un espacio seguro y acogedor para reconectar contigo misma, resignificar historias y dar los próximos pasos con más claridad, ligereza y propósito.",
            "btn-agendar-sessao": "Agendar sesión",
            "btn-conhecer-mais": "Conocer más",

            "sobre-etiqueta": "Sobre mí",
            "sobre-titulo": "Un camino de escucha, presencia y transformación",
            "sobre-p1": "Mi camino de autoconocimiento comenzó en 2018, en un momento de profunda transformación en mi vida, cuando necesité mirar hacia adentro y encontrar nuevos caminos. Fue a partir de esa experiencia que nació una búsqueda por comprenderme mejor, comprender al ser humano y los procesos de evolución personal.",
            "sobre-p2": "A lo largo de ese camino, encontré una nueva forma de ver la vida y también descubrí mi propósito: acompañar a otras personas en sus propios procesos de sanación, conciencia y transformación. Hoy utilizo herramientas de sabiduría ancestral y terapias que comprenden al ser humano de forma integral — alma, mente, cuerpo y emociones.",
            "btn-mais-sobre-mim": "Más sobre mí",

            "terapias-titulo": "Terapias",
            "terapias-subtitulo": "Cada proceso es único. Conoce los enfoques que utilizo para acompañar tu camino de sanación y autoconocimiento, siempre respetando tu ritmo.",
            "terapia1-titulo": "Constelaciones Familiares en el Agua",
            "terapia1-texto": "Un proceso de conciencia sobre el origen de los bloqueos y conflictos, comprendiendo la dinámica familiar detrás de estas experiencias y permitiendo nuevas perspectivas para transformar tu relación contigo misma y con el mundo.",
            "terapia2-titulo": "Lectura de Registros Akáshicos",
            "terapia2-texto": "En conexión con tus maestros y guías, esta lectura permite acceder a mensajes e insights importantes para tu camino, aportando más claridad, conciencia y orientación para tu momento actual.",
            "terapia3-titulo": "Tarot Evolutivo, Sistémico y Transgeneracional",
            "terapia3-texto": "Una herramienta de autoconocimiento que permite acceder al inconsciente, identificar bloqueos y patrones, acogiendo aquello que necesita ser transformado y recibiendo una orientación para continuar tu camino.",
            "terapia4-titulo": "Reiki",
            "terapia4-texto": "Una terapia de armonización energética mediante la canalización de energía de sanación, ayudando al equilibrio energético, la relajación y el acompañamiento en momentos de transformación emocional.",
            "terapia5-titulo": "Péndulo",
            "terapia5-texto": "Una herramienta utilizada para la armonización energética, desbloqueos, limpiezas y potenciación de proyectos, deseos y espacios, buscando equilibrio en diferentes áreas de la vida.",
            "link-saber-mais": "Saber más",

            "cursos-etiqueta": "Formación",
            "cursos-titulo": "Cursos y talleres para tu desarrollo personal",
            "cursos-subtitulo" : "Con especialidad en el Agua",
            "cursos-texto": "Programas presenciales y online pensados para quienes desean ir más allá de las sesiones individuales — herramientas prácticas de autoconocimiento, regulación emocional y conexión espiritual para aplicar en el día a día.",
            "btn-ver-cursos": "Ver cursos disponibles",

            "faq-titulo": "Preguntas frecuentes",
            "faq-subtitulo": "Resuelve tus dudas antes de iniciar tu proceso terapéutico. Si no encuentras la respuesta que buscas, escríbeme directamente.",
            "faq1-pergunta": "¿Necesito alguna derivación para iniciar el acompañamiento?",
            "faq1-resposta": "No. Puedes contactarme directamente, sin necesidad de derivación médica o psicológica. En la primera sesión, conversamos sobre tu momento y definimos juntas el mejor camino.",
            "faq2-pergunta": "¿Las sesiones son online o presenciales?",
            "faq2-resposta": "Ofrezco ambas modalidades. Las sesiones online se realizan por videollamada, con la misma calidad de presencia y acogida que las sesiones presenciales.",
            "faq3-pergunta": "¿Con qué frecuencia debo hacer las sesiones?",
            "faq3-resposta": "Cada proceso es único. Generalmente recomiendo encuentros semanales o quincenales al inicio, ajustando la frecuencia según tu evolución y necesidades.",
            "faq4-pergunta": "¿Qué son las Constelaciones Familiares?",
            "faq4-resposta": "Es un enfoque que revela dinámicas y patrones invisibles transmitidos entre generaciones, ayudando a comprender y transformar conflictos que se repiten en tu historia.",
            "faq5-pergunta": "¿Cómo agendo mi primera sesión?",
            "faq5-resposta": "Solo completa el formulario de agendamiento a continuación o envía un mensaje por WhatsApp. En pocas horas te responderé para confirmar el mejor horario para ti.",

            "depo-titulo": "Testimonios",
            "depo-subtitulo": "Historias reales de personas que encontraron una nueva mirada sobre sí mismas a través del acompañamiento terapéutico.",
            "depo-texto": "Las sesiones me ayudaron a comprender patrones que repetía desde hace años sin darme cuenta. Hoy me siento más ligera, presente y en paz con mi propia historia.",
            "depo-nome": "Mariana G.",
            "depo-cargo": "En acompañamiento desde 2023",

            "agenda-titulo": "Agenda tu sesión",
            "agenda-subtitulo": "Elige el día y el horario que mejor se adapten a tu rutina.",
            "label-servico": "Servicio",
            "opt-servico-placeholder": "Selecciona un servicio",
            "opt-servico-5": "Sesión de Evaluación",
            "label-data": "Fecha",
            "label-horario": "Horario",
            "opt-horario-placeholder": "Selecciona un horario",
            "opt-horario-1": "Mañana (9h–12h)",
            "opt-horario-2": "Tarde (14h–17h)",
            "opt-horario-3": "Noche (18h–20h)",
            "btn-agendar-agora": "Agendar ahora",
            "msg-agendamento-sucesso": "¡Recibimos tu solicitud! Pronto nos pondremos en contacto para confirmar el horario.",
            "msg-agendamento-erro": "Por favor, completa todos los campos antes de continuar.",

            "rodape-tagline": "Acompañamiento terapéutico para tu transformación y crecimiento personal.",
            "rodape-col-navegacao": "Navegación",
            "rodape-col-terapias": "Terapias",
            "rodape-col-newsletter": "Newsletter",
            "rodape-newsletter-texto": "Recibe reflexiones, novedades sobre cursos y contenidos exclusivos directamente en tu correo.",
            "placeholder-email": "Tu correo",
            "btn-inscrever": "Suscribirme",
            "rodape-privacidade": "Política de Privacidad",
            "rodape-termos": "Términos y Condiciones",
            "rodape-copyright": "© 2026 Espiral de Sabiduría. Todos los derechos reservados.",
            "msg-newsletter-sucesso": "¡Suscripción realizada con éxito! Pronto recibirás nuestras novedades."
        },
        en: {
            "nav-inicio": "Home",
            "nav-sobre": "About me",
            "nav-terapias": "Therapies",
            "nav-cursos": "Courses",
            "nav-faq": "FAQ",
            "nav-depoimentos": "Testimonials",
            "nav-contato": "Contact",

            "hero-etiqueta": "Therapeutic support",
            "hero-titulo": 'Accompanying processes of <em class="destaque">transformation</em> and personal growth',
            "hero-texto": "A safe and welcoming space for you to reconnect with yourself, reframe your story, and take the next steps with more clarity, lightness, and purpose.",
            "btn-agendar-sessao": "Book a session",
            "btn-conhecer-mais": "Learn more",

            "sobre-etiqueta": "About me",
            "sobre-titulo": "A path of listening, presence and transformation",
            "sobre-p1": "My journey of self-knowledge began in 2018, during a profound moment of transformation in my life, when I needed to look within and find new paths. From that experience, a search was born to better understand myself, the human being, and the processes of personal evolution.",
            "sobre-p2": "Along this path, I found a new way of seeing life and also discovered my purpose: to accompany other people in their own journeys of healing, awareness, and transformation. Today I use tools of ancestral wisdom and therapies that understand the human being in an integral way — soul, mind, body, and emotions.",
            "btn-mais-sobre-mim": "More about me",

            "terapias-titulo": "Therapies",
            "terapias-subtitulo": "Each process is unique. Discover the approaches I use to support your healing and self-knowledge journey, always at your own pace.",
            "terapia1-titulo": "Family Constellations in Water",
            "terapia1-texto": "A process of awareness about the origin of emotional blocks and conflicts, understanding the family dynamics behind these experiences and creating new perspectives for transformation.",
            "terapia2-titulo": "Akashic Records Reading",
            "terapia2-texto": "Connected with your masters and guides, this reading allows access to meaningful messages and insights for your journey, bringing clarity, awareness and guidance for your current moment.",
            "terapia3-titulo": "Evolutionary, Systemic and Transgenerational Tarot",
            "terapia3-texto": "A self-knowledge tool that allows access to the unconscious, identifying blocks and patterns while welcoming what needs transformation and offering guidance for your next steps.",
            "terapia4-titulo": "Reiki",
            "terapia4-texto": "An energetic harmonization therapy through healing energy channeling, helping restore balance, relaxation and support during intense emotional processes.",
            "terapia5-titulo": "Pendulum",
            "terapia5-texto": "A tool used for energetic harmonization, block removal, cleansing and strengthening projects, intentions and environments.",
            "link-saber-mais": "Learn more",

            "cursos-etiqueta": "Training",
            "cursos-titulo": "Courses and workshops for your personal development",
            "cursos-subtitulo" : "With a specialization in Water",
            "cursos-texto": "In-person and online programmes designed for those who want to go beyond individual sessions — practical tools for self-knowledge, emotional regulation, and spiritual connection to apply every day.",
            "btn-ver-cursos": "View available courses",

            "faq-titulo": "Frequently asked questions",
            "faq-subtitulo": "Get your questions answered before starting your therapeutic process. If you can't find what you're looking for, reach out to me directly.",
            "faq1-pergunta": "Do I need a referral to start the process?",
            "faq1-resposta": "No. You can contact me directly, without any medical or psychological referral. In the first session we talk about where you are and decide together the best path forward.",
            "faq2-pergunta": "Are sessions online or in-person?",
            "faq2-resposta": "I offer both options. Online sessions take place via video call, with the same quality of presence and care as in-person sessions.",
            "faq3-pergunta": "How often should I have sessions?",
            "faq3-resposta": "Each process is unique. I generally recommend weekly or fortnightly sessions at the start, adjusting the frequency as you evolve and according to your needs.",
            "faq4-pergunta": "What are Family Constellations?",
            "faq4-resposta": "It is an approach that reveals invisible dynamics and patterns passed down through generations, helping to understand and transform conflicts that repeat in your history.",
            "faq5-pergunta": "How do I book my first session?",
            "faq5-resposta": "Simply fill in the booking form below or send a WhatsApp message. I will get back to you within a few hours to confirm the best time for you.",

            "depo-titulo": "Testimonials",
            "depo-subtitulo": "Real stories from people who found a new perspective on themselves through therapeutic support.",
            "depo-texto": "The sessions helped me understand patterns I had been repeating for years without realising. Today I feel lighter, more present, and at peace with my own story.",
            "depo-nome": "Mariana G.",
            "depo-cargo": "In therapy since 2023",

            "agenda-titulo": "Book your session",
            "agenda-subtitulo": "Choose the day and time that best fits your routine.",
            "label-servico": "Service",
            "opt-servico-placeholder": "Select a service",
            "opt-servico-5": "Assessment Session",
            "label-data": "Date",
            "label-horario": "Time",
            "opt-horario-placeholder": "Select a time",
            "opt-horario-1": "Morning (9am–12pm)",
            "opt-horario-2": "Afternoon (2pm–5pm)",
            "opt-horario-3": "Evening (6pm–8pm)",
            "btn-agendar-agora": "Book now",
            "msg-agendamento-sucesso": "We received your request! We will be in touch shortly to confirm your appointment.",
            "msg-agendamento-erro": "Please fill in all fields before continuing.",

            "rodape-tagline": "Therapeutic support for your transformation and personal growth.",
            "rodape-col-navegacao": "Navigation",
            "rodape-col-terapias": "Therapies",
            "rodape-col-newsletter": "Newsletter",
            "rodape-newsletter-texto": "Receive reflections, course updates, and exclusive content directly in your inbox.",
            "placeholder-email": "Your email",
            "btn-inscrever": "Subscribe",
            "rodape-privacidade": "Privacy Policy",
            "rodape-termos": "Terms & Conditions",
            "rodape-copyright": "© 2026 Espiral de Sabedoria. All rights reserved.",
            "msg-newsletter-sucesso": "Successfully subscribed! You will soon receive our updates."
        },
        fr: {
            "nav-inicio": "Accueil",
            "nav-sobre": "À propos",
            "nav-terapias": "Thérapies",
            "nav-cursos": "Cours",
            "nav-faq": "FAQ",
            "nav-depoimentos": "Témoignages",
            "nav-contato": "Contact",

            "hero-etiqueta": "Accompagnement thérapeutique",
            "hero-titulo": 'Accompagner les processus de <em class="destaque">transformation</em> et de croissance personnelle',
            "hero-texto": "Un espace sûr et bienveillant pour vous reconnecter à vous-même, redéfinir votre histoire et avancer avec plus de clarté, de légèreté et de sens.",
            "btn-agendar-sessao": "Prendre rendez-vous",
            "btn-conhecer-mais": "En savoir plus",

            "sobre-etiqueta": "À propos de moi",
            "sobre-titulo": "Un chemin d'écoute, de présence et de transformation",
            "sobre-p1": "Mon parcours de connaissance de soi a commencé en 2018, lors d’un moment de profonde transformation dans ma vie, lorsque j’ai dû me tourner vers l’intérieur et trouver de nouveaux chemins. C’est à partir de cette expérience qu’est née une recherche pour mieux me comprendre, comprendre l’être humain et les processus d’évolution personnelle.",
            "sobre-p2": "Tout au long de ce chemin, j’ai trouvé une nouvelle façon de voir la vie et j’ai également découvert ma mission : accompagner d’autres personnes dans leurs propres parcours de guérison, de conscience et de transformation. Aujourd’hui, j’utilise des outils de sagesse ancestrale et des thérapies qui comprennent l’être humain de manière intégrale — âme, esprit, corps et émotions.",
            "btn-mais-sobre-mim": "En savoir plus sur moi",

            "terapias-titulo": "Thérapies",
            "terapias-subtitulo": "Chaque processus est unique. Découvrez les approches que j'utilise pour soutenir votre chemin de guérison et de connaissance de soi, toujours à votre rythme.",
            "terapia1-titulo": "Constellations Familiales dans l’Eau",
            "terapia1-texto": "Un processus de prise de conscience de l’origine des blocages et des conflits, permettant de comprendre les dynamiques familiales et d’apporter de nouvelles perspectives de transformation.",
            "terapia2-titulo": "Lecture des Archives Akashiques",
            "terapia2-texto": "En connexion avec vos maîtres et guides, cette lecture permet d’accéder aux messages et aux compréhensions nécessaires à votre cheminement.",
            "terapia3-titulo": "Tarot Évolutif, Systémique et Transgénérationnel",
            "terapia3-texto": "Un outil de connaissance de soi permettant d’accéder à l’inconscient, de comprendre les blocages et d’accueillir ce qui demande transformation avec amour et conscience.",
            "terapia4-titulo": "Reiki",
            "terapia4-texto": "Une thérapie d’harmonisation énergétique basée sur la canalisation d’une énergie de guérison, favorisant l’équilibre, la détente et l’accompagnement émotionnel.",
            "terapia5-titulo": "Pendule",
            "terapia5-texto": "Un outil utilisé pour l’harmonisation énergétique, les libérations, les nettoyages et l’accompagnement de projets, intentions et espaces.",
            "link-saber-mais": "En savoir plus",

            "cursos-etiqueta": "Formation",
            "cursos-titulo": "Cours et ateliers pour votre développement personnel",
            "cursos-subtitulo" : "Spécialisé dans l’Eau",
            "cursos-texto": "Des programmes en présentiel et en ligne conçus pour ceux qui souhaitent aller au-delà des séances individuelles — des outils pratiques de connaissance de soi, de régulation émotionnelle et de connexion spirituelle à appliquer au quotidien.",
            "btn-ver-cursos": "Voir les cours disponibles",

            "faq-titulo": "Questions fréquentes",
            "faq-subtitulo": "Trouvez les réponses à vos questions avant de commencer votre processus thérapeutique. Si vous ne trouvez pas ce que vous cherchez, contactez-moi directement.",
            "faq1-pergunta": "Ai-je besoin d'une orientation médicale pour commencer ?",
            "faq1-resposta": "Non. Vous pouvez me contacter directement, sans aucune orientation médicale ou psychologique. Lors de la première séance, nous parlons de votre situation et définissons ensemble le meilleur chemin.",
            "faq2-pergunta": "Les séances sont-elles en ligne ou en présentiel ?",
            "faq2-resposta": "Je propose les deux modalités. Les séances en ligne se déroulent par appel vidéo, avec la même qualité de présence et d'accueil que les séances en présentiel.",
            "faq3-pergunta": "À quelle fréquence dois-je faire les séances ?",
            "faq3-resposta": "Chaque processus est unique. Je recommande généralement des rencontres hebdomadaires ou bimensuelles au début, en ajustant la fréquence selon votre évolution et vos besoins.",
            "faq4-pergunta": "Que sont les Constellations Familiales ?",
            "faq4-resposta": "C'est une approche qui révèle des dynamiques et des schémas invisibles transmis entre les générations, aidant à comprendre et transformer des conflits qui se répètent dans votre histoire.",
            "faq5-pergunta": "Comment prendre rendez-vous pour ma première séance ?",
            "faq5-resposta": "Il suffit de remplir le formulaire ci-dessous ou d'envoyer un message WhatsApp. Je vous répondrai dans les quelques heures pour confirmer le meilleur créneau pour vous.",

            "depo-titulo": "Témoignages",
            "depo-subtitulo": "Des histoires réelles de personnes qui ont trouvé un nouveau regard sur elles-mêmes grâce à l'accompagnement thérapeutique.",
            "depo-texto": "Les séances m'ont aidée à comprendre des schémas que je répétais depuis des années sans m'en rendre compte. Aujourd'hui je me sens plus légère, présente et en paix avec ma propre histoire.",
            "depo-nome": "Mariana G.",
            "depo-cargo": "En accompagnement depuis 2023",

            "agenda-titulo": "Prendre rendez-vous",
            "agenda-subtitulo": "Choisissez le jour et l'heure qui correspondent le mieux à votre emploi du temps.",
            "label-servico": "Service",
            "opt-servico-placeholder": "Sélectionnez un service",
            "opt-servico-5": "Séance d'Évaluation",
            "label-data": "Date",
            "label-horario": "Horaire",
            "opt-horario-placeholder": "Sélectionnez un horaire",
            "opt-horario-1": "Matin (9h–12h)",
            "opt-horario-2": "Après-midi (14h–17h)",
            "opt-horario-3": "Soir (18h–20h)",
            "btn-agendar-agora": "Réserver maintenant",
            "msg-agendamento-sucesso": "Nous avons reçu votre demande ! Nous vous contacterons bientôt pour confirmer le créneau.",
            "msg-agendamento-erro": "Veuillez remplir tous les champs avant de continuer.",

            "rodape-tagline": "Accompagnement thérapeutique pour votre transformation et croissance personnelle.",
            "rodape-col-navegacao": "Navigation",
            "rodape-col-terapias": "Thérapies",
            "rodape-col-newsletter": "Newsletter",
            "rodape-newsletter-texto": "Recevez des réflexions, des nouveautés sur les cours et des contenus exclusifs directement dans votre boîte mail.",
            "placeholder-email": "Votre e-mail",
            "btn-inscrever": "S'inscrire",
            "rodape-privacidade": "Politique de Confidentialité",
            "rodape-termos": "Conditions Générales",
            "rodape-copyright": "© 2026 Espiral de Sabedoria. Tous droits réservés.",
            "msg-newsletter-sucesso": "Inscription réussie ! Vous recevrez bientôt nos nouveautés."
        }
    };

    let idiomaAtual = "pt";

    function aplicarIdioma(idioma) {
        const textos = dicionario[idioma];
        if (!textos) return;

        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const chave = el.getAttribute("data-i18n");
            const valor = textos[chave];
            if (valor === undefined) return;

            if (el.hasAttribute("data-i18n-html")) {
                el.innerHTML = valor;
            } else {
                el.textContent = valor;
            }
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
            const chave = el.getAttribute("data-i18n-placeholder");
            const valor = textos[chave];
            if (valor !== undefined) {
                el.setAttribute("placeholder", valor);
            }
        });

        const mapaLang = { pt: "pt-BR", es: "es", en: "en", fr: "fr" };
        document.documentElement.setAttribute("lang", mapaLang[idioma] || idioma);

        idiomaAtual = idioma;
    }

    const botoesIdioma = document.querySelectorAll(".idiomas__btn");
    const containerIdiomas = document.querySelector(".idiomas");

    // Toggle de expansão no mobile (só o ativo fica visível por padrão)
    if (containerIdiomas) {
        containerIdiomas.addEventListener("click", (e) => {
            const botaoClicado = e.target.closest(".idiomas__btn");
            if (!botaoClicado) return;

            const isMobile = window.matchMedia("(max-width: 920px)").matches;
            const estaExpandido = containerIdiomas.classList.contains("is-expandido");
            const idiomaClicado = botaoClicado.getAttribute("data-lang");

            // Mobile + colapsado: apenas expande, não troca idioma ainda
            if (isMobile && !estaExpandido) {
                containerIdiomas.classList.add("is-expandido");
                return;
            }

            // Troca de idioma
            if (idiomaClicado !== idiomaAtual) {
                botoesIdioma.forEach((b) => {
                    const ativo = b === botaoClicado;
                    b.classList.toggle("is-ativo", ativo);
                    b.setAttribute("aria-pressed", String(ativo));
                });
                aplicarIdioma(idiomaClicado);
            }

            // Colapsa após seleção no mobile
            if (isMobile) {
                containerIdiomas.classList.remove("is-expandido");
            }
        });

        // Fecha o seletor ao clicar fora no mobile
        document.addEventListener("click", (e) => {
            if (
                !containerIdiomas.contains(e.target) &&
                containerIdiomas.classList.contains("is-expandido")
            ) {
                containerIdiomas.classList.remove("is-expandido");
            }
        });

        // Fecha com Escape
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                containerIdiomas.classList.remove("is-expandido");
            }
        });
    }

    /* ----------------------------------------------------------------
       6. Formulário de agendamento — redireciona para WhatsApp
       ---------------------------------------------------------------- */
    const formAgendamento = document.querySelector('[data-form="agendamento"]');
    const campoData = document.getElementById("campo-data");

    // Impede selecionar datas no passado
    if (campoData) {
        const hoje = new Date();
        const aaaa = hoje.getFullYear();
        const mm = String(hoje.getMonth() + 1).padStart(2, "0");
        const dd = String(hoje.getDate()).padStart(2, "0");
        campoData.setAttribute("min", `${aaaa}-${mm}-${dd}`);
    }

    if (formAgendamento) {
        const msgErro = document.getElementById("agendamento-erro");

        formAgendamento.addEventListener("submit", (evento) => {
            evento.preventDefault();

            if (!formAgendamento.checkValidity()) {
                if (msgErro) msgErro.classList.add("is-visivel");
                return;
            }

            if (msgErro) msgErro.classList.remove("is-visivel");

            const servico  = document.getElementById("campo-servico").value;
            const data     = document.getElementById("campo-data").value;
            const horario  = document.getElementById("campo-horario").value;

            // Formata a data de AAAA-MM-DD para DD/MM/AAAA
            const [aaaa, mm, dd] = data.split("-");
            const dataFormatada = `${dd}/${mm}/${aaaa}`;

            const mensagens = {
                pt: `Olá! Gostaria de agendar uma sessão.\n\n• Serviço: ${servico}\n• Data: ${dataFormatada}\n• Horário: ${horario}`,
                es: `¡Hola! Me gustaría agendar una sesión.\n\n• Servicio: ${servico}\n• Fecha: ${dataFormatada}\n• Horario: ${horario}`,
                en: `Hello! I'd like to book a session.\n\n• Service: ${servico}\n• Date: ${dataFormatada}\n• Time: ${horario}`,
                fr: `Bonjour ! Je voudrais prendre rendez-vous.\n\n• Service : ${servico}\n• Date : ${dataFormatada}\n• Horaire : ${horario}`,
            };

            const msg = mensagens[idiomaAtual] || mensagens.pt;

            // ⚠️ Substitua pelo número real com código do país (sem + nem espaços)
            const numero = "5500000000000";

            window.open(
                `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`,
                "_blank",
                "noopener,noreferrer"
            );

            formAgendamento.reset();
            if (campoData) {
                campoData.setAttribute("min", new Date().toISOString().split("T")[0]);
            }
        });
    }

    /* ----------------------------------------------------------------
       7. Formulário de newsletter
       ---------------------------------------------------------------- */
    const formNewsletter = document.getElementById("form-newsletter");

    if (formNewsletter) {
        formNewsletter.addEventListener("submit", (evento) => {
            evento.preventDefault();

            const campoEmail = document.getElementById("newsletter-email");
            if (!campoEmail || !campoEmail.checkValidity()) {
                campoEmail && campoEmail.reportValidity();
                return;
            }

            const botao = formNewsletter.querySelector(".newsletter__btn span");
            const textoOriginal = botao ? botao.textContent : "";
            const textoSucesso = dicionario[idiomaAtual]["msg-newsletter-sucesso"];

            if (botao) {
                botao.textContent =
                    idiomaAtual === "pt" ? "Inscrito!" : "¡Listo!";
            }

            formNewsletter.reset();

            window.setTimeout(() => {
                if (botao) botao.textContent = textoOriginal;
            }, 2500);

            // textoSucesso fica disponível para integração futura
            // (ex.: exibir em um elemento de feedback dedicado)
            console.info(textoSucesso);
        });
    }
})();
