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
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    obs.unobserve(entry.target);
                }
            });
        },
        {
            root: null,
            threshold: 0,
            rootMargin: "0px 0px -20% 0px"
        }
    );

    containers.forEach((el) => {
        el.classList.remove("active"); // garante estado inicial
        observer.observe(el);
    });
} else {
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
                link.getAttribute("href") === `#${id}`,
            );
            });
        }
        });
    },
    { rootMargin: "-45% 0px -45% 0px" },
    );

    secoes.forEach((secao) => navObserver.observe(secao));
}

/* ----------------------------------------------------------------
        4. Acordeão de Perguntas Frequentes
    ---------------------------------------------------------------- */
document.querySelectorAll(".faq-question").forEach((botao) => {
    botao.addEventListener("click", () => {
    const conteudo = document.getElementById(
        botao.getAttribute("aria-controls"),
    );
    const aberto = botao.getAttribute("aria-expanded") === "true";

    botao.setAttribute("aria-expanded", String(!aberto));
    if (conteudo) {
        conteudo.classList.toggle("is-aberto", !aberto);
    }
    });
});

/* ----------------------------------------------------------------
        5. Seletor de idioma (PT / ES / EN / FR)
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
    "default-wa" : "Olá Anne, vim pelo seu site e gostaria de mais informações.",

    "hero-etiqueta": "Acompanhamento terapêutico",
    "hero-titulo":
        'Acompanhando processos de <em class="destaque">transformação</em> e crescimento pessoal',
    "hero-texto":
        "Um espaço seguro e acolhedor para você se reconectar consigo mesma, ressignificar histórias e dar os próximos passos com mais clareza, leveza e propósito.",
    "btn-agendar-sessao": "Agendar sessão",
    "btn-conhecer-mais": "Conhecer mais",

    "sobre-etiqueta": "Sobre mim",
    "sobre-titulo": "Um caminho de escuta, presença e transformação",
    "sobre-p1":
        "Minha jornada de autoconhecimento começou em 2018, em um momento de profunda transformação na minha vida, quando precisei olhar para dentro e encontrar novos caminhos. Foi a partir dessa experiência que nasceu uma busca por compreender mais sobre mim, sobre o ser humano e sobre os processos de evolução pessoal.",
    "sobre-p2":
        "Ao longo desse caminho, encontrei uma nova forma de enxergar a vida e descobri também o meu propósito: acompanhar outras pessoas em suas próprias jornadas de cura, consciência e transformação. Hoje utilizo ferramentas de sabedoria ancestral e terapias que compreendem o ser humano de forma integral — alma, mente, corpo e emoções.",
    "btn-mais-sobre-mim": "Mais sobre mim",

    "terapias-titulo": "Terapias",
    "terapias-subtitulo":
        "Cada processo é único. Conheça as abordagens que utilizo para apoiar o seu caminho de cura e autoconhecimento, sempre respeitando o seu ritmo.",
    "terapia1-titulo": "Constelações Familiares na Água",
    "terapia1-texto":
        "Um processo de consciência sobre a origem dos bloqueios e conflitos, compreendendo dinâmicas familiares e permitindo novas percepções para transformar sua relação consigo mesma e com o mundo.",
    "terapia2-titulo": "Leitura de Registros Akáshicos",
    "terapia2-texto":
        "Em conexão com seus mestres e guias, essa leitura possibilita acessar mensagens e insights importantes para sua caminhada, trazendo clareza, consciência e direcionamento.",
    "terapia3-titulo": "Tarô Evolutivo, Sistêmico e Transgeracional",
    "terapia3-texto":
        "Uma ferramenta de autoconhecimento que acessa conteúdos do inconsciente, ajudando a compreender bloqueios, acolher processos e encontrar novos caminhos com mais consciência.",
    "terapia4-titulo": "Reiki",
    "terapia4-texto":
        "Uma terapia de harmonização energética através da canalização da energia de cura, auxiliando no equilíbrio, relaxamento e apoio em momentos de transformação emocional.",
    "terapia5-titulo": "Pêndulo",
    "terapia5-texto":
        "Uma ferramenta utilizada para harmonização energética, desbloqueios, limpezas e potencialização de projetos, desejos e ambientes, trazendo equilíbrio para diferentes áreas da vida.",
    "link-saber-mais": "Saber mais",

    "cursos-etiqueta": "Constelações Familiares",
    "cursos-titulo": "Cursos e workshops para o seu desenvolvimento pessoal",
    "cursos-subtitulo": "Com especialidade na Água",
    "cursos-texto":
        "Programas presenciais e online pensados para quem deseja ir além das sessões individuais — ferramentas práticas de autoconhecimento, regulação emocional e conexão espiritual para aplicar no dia a dia.",

    "btn-ver-cursos": "Ver detalhes e inscrição",

    "cursos-tag-1": "Online · 12 meses",
    "cursos-tag-2": "Aulas ao vivo e gravadas",
    "cursos-tag-3": "Início 18 de agosto 2026",

    "cursos-aprende-titulo": "O que você vai aprender",

    "aprende-1-titulo": "Escuta terapêutica",
    "aprende-1-texto":
        "Aprender a escutar além das palavras, identificando o que o consultante expressa de forma consciente e inconsciente.",

    "aprende-2-titulo": "Olhar sistêmico profundo",
    "aprende-2-texto":
        "Compreender como vínculos, lealdades invisíveis e histórias familiares influenciam as experiências presentes.",

    "aprende-3-titulo": "Estados do ser",
    "aprende-3-texto":
        "Reconhecer quando uma pessoa está no Estado Criança, Vítima, Juiz ou Adulto, e como acompanhá-la rumo à consciência e responsabilidade pessoal.",

    "aprende-4-titulo": "Arte de observar sem julgar",
    "aprende-4-texto":
        "Desenvolver uma atitude interna baseada na presença, no respeito e na observação fenomenológica.",

    "aprende-5-titulo": "Frases sanadoras",
    "aprende-5-texto":
        "Utilizar palavras que facilitam processos de integração, reconhecimento e transformação dentro do sistema familiar.",

    "aprende-6-titulo": "Terapia Transgeracional",
    "aprende-6-texto":
        "Incorporar conceitos como Projeto Sentido, Lealdades Invisíveis, Memória Familiar e Ciclos Biológicos Memorizáveis.",

    "aprende-7-titulo": "Cartas Sabedoria em Espiral®",
    "aprende-7-texto":
        "Utilizar cartas terapêuticas como recurso complementar em sessões individuais, autoconstelações e processos de acompanhamento.",

    "aprende-8-titulo": "Constelações Individuais na Água ✦",
    "aprende-8-texto":
        "Metodologia única para observar dinâmicas sistêmicas através do movimento dos elementos na água, ampliando a compreensão do campo e do processo terapêutico.",

    "aprende-9-titulo": "Atos simbólicos e recursos",
    "aprende-9-texto":
        "Conhecer diferentes exercícios e ferramentas para acompanhar processos que vão além da constelação.",

    "cursos-inclui-titulo": "O que está incluído",

    "inclui-1": "16 módulos de formação",
    "inclui-2": "Especialização em Constelações Individuais no Água",
    "inclui-3": "Material de estudo",
    "inclui-4": "Práticas supervisionadas",
    "inclui-5": "Gravações das aulas",
    "inclui-6": "Grupo de acompanhamento",
    "inclui-7": "Certificado de Formação",

    "cursos-invest-titulo": "Investimento",

    "cursos-preco-mensal": "USD 60",
    "cursos-preco-mensal-label": "por mês · 12 parcelas",

    "cursos-ou": "ou",

    "cursos-preco-total": "USD 690",
    "cursos-preco-total-label": "pagamento único · economize USD 30",

    "cursos-pagamentos": "Formas de pagamento: PayPal, Wise, Link de pagamento, Prex, Pix.",

    "cursos-formato-1": "Online",
    "cursos-formato-2": "12 meses",
    "cursos-formato-3": "1h30 semanais",
    "cursos-formato-4": "Aulas ao vivo e gravadas",
    "cursos-formato-5": "Início 18 de agosto 2026",

    "btn-inscrever-curso": "Quero me inscrever",

    "inscricao-curso1": "Olá Anne, gostaria de me inscrever no curso de Constelações Familiares com especialidade na água.",
    "inscricao-curso2": "Olá Anne, gostaria de me increver no curso de especialização em Contelações Familiares na água",

    "curso2-etiqueta": "Formação Especializada",
    "curso2-subtitulo": "Constelações Familiares na Água",
    "curso2-texto": "Uma formação prática para consteladores e terapeutas que desejam aprofundar sua prática através do trabalho com constelações na água, desenvolvendo escuta sistêmica, percepção do campo e segurança na facilitação.",

    "curso2-tag-1": "Online · 3 meses",
    "curso2-tag-2": "Aulas a cada 15 dias",
    "curso2-tag-3": "Início 22 de agosto",

    "curso2-btn-ver": "Ver detalhes e inscrição",

    "curso2-aprende-titulo": "O que você vai aprender",

    "curso2-aprende-1-titulo": "Prática de constelações",
    "curso2-aprende-1-texto": "Vivenciar práticas de constelação utilizando a água como recurso de observação e aprofundamento do campo sistêmico.",

    "curso2-aprende-2-titulo": "Leitura do movimento na água",
    "curso2-aprende-2-texto": "Desenvolver a percepção sobre os movimentos e informações que surgem através dos elementos no campo da água.",

    "curso2-aprende-3-titulo": "Escuta sistêmica",
    "curso2-aprende-3-texto": "Aprofundar a capacidade de escutar além das palavras, percebendo movimentos e dinâmicas do sistema.",

    "curso2-aprende-4-titulo": "Presença do facilitador",
    "curso2-aprende-4-texto": "Fortalecer a presença, confiança e segurança para acompanhar processos de constelação.",

    "curso2-aprende-5-titulo": "Intuição e percepção",
    "curso2-aprende-5-texto": "Conectar-se com a percepção interna do facilitador e com os movimentos que conduzem o processo.",

    "curso2-aprende-6-titulo": "Leitura do campo",
    "curso2-aprende-6-texto": "Ampliar a compreensão sobre o campo sistêmico e suas manifestações durante uma sessão.",

    "curso2-aprende-7-titulo": "Diferentes caminhos das constelações",
    "curso2-aprende-7-texto": "Respeitar e integrar diferentes experiências e abordagens dentro das Constelações Familiares.",

    "curso2-aprende-8-titulo": "Constelações na Água ✦",
    "curso2-aprende-8-texto": "Explorar uma metodologia prática utilizando a água como meio de observação dos movimentos sistêmicos.",

    "curso2-aprende-9-titulo": "Prática e integração",
    "curso2-aprende-9-texto": "Criar um espaço de troca, aprendizado compartilhado e desenvolvimento da própria forma de facilitar.",

    "curso2-inclui-titulo": "O que está incluído",

    "curso2-inclui-1": "7 encontros online ao vivo",
    "curso2-inclui-2": "Duração de 3 meses",
    "curso2-inclui-3": "Aulas a cada 15 dias",
    "curso2-inclui-4": "Gravação das aulas",
    "curso2-inclui-5": "Práticas supervisionadas",
    "curso2-inclui-6": "Material de apoio",
    "curso2-inclui-7": "Grupo de acompanhamento",

    "curso2-invest-titulo": "Investimento",

    "curso2-preco-mensal": "USD 70",
    "curso2-preco-mensal-label": "por mês",

    "curso2-ou": "ou",

    "curso2-preco-total": "USD 195",
    "curso2-preco-total-label": "formação completa",

    "curso2-pagamentos": "Formas de pagamento: PayPal, Wise, Link de pagamento, Prex, Pix.",

    "curso2-formato-1": "Online",
    "curso2-formato-2": "3 meses",
    "curso2-formato-3": "Sábados a cada 15 dias",
    "curso2-formato-4": "Aulas ao vivo e gravadas",
    "curso2-formato-5": "Início 22 de agosto de 2026",

    "curso2-btn-inscrever": "Quero me inscrever",

    "faq-titulo": "Perguntas frequentes",
    "faq-subtitulo":
        "Tire suas dúvidas antes de iniciar o seu processo terapêutico. Se não encontrar a resposta que procura, fale comigo diretamente.",
    "faq1-pergunta":
        "Preciso de alguma indicação para iniciar o acompanhamento?",
    "faq1-resposta":
        "Não. Você pode entrar em contato diretamente comigo, sem necessidade de indicação médica ou psicológica. Na primeira sessão, conversamos sobre o seu momento e definimos juntas o melhor caminho. Porém, para as constelações familiares, caso esteja realizando acompanhamento psiquiátrico, é necessário consultar o profissional que está realizando o acompanhamento para verificar se você está autorizado a isso.",
    "faq2-pergunta": "As sessões são online ou presenciais?",
    "faq2-resposta":
        "Ofereço as duas modalidades. As sessões online acontecem por videochamada, com a mesma qualidade de presença e acolhimento das sessões presenciais.",
    "faq3-pergunta": "Com que frequência devo fazer as sessões?",
    "faq3-resposta":
        "Cada processo é único. Geralmente recomendo encontros semanais ou quinzenais no início, ajustando a frequência conforme a sua evolução e necessidades.",
    "faq4-pergunta": "O que são as Constelações Familiares?",
    "faq4-resposta":
        "É uma abordagem que revela dinâmicas e padrões invisíveis transmitidos entre gerações, ajudando a compreender e transformar conflitos que se repetem na sua história.",
    "faq5-pergunta": "Como faço para agendar minha primeira sessão?",
    "faq5-resposta":
        "Basta preencher o formulário de agendamento abaixo ou enviar uma mensagem pelo WhatsApp. Em poucas horas eu retorno para confirmar o melhor horário para você.",

    "depo-titulo": "Depoimentos",
    "depo-subtitulo":
        "Histórias reais de pessoas que encontraram um novo olhar sobre si mesmas através do acompanhamento terapêutico.",

    "depo-1-texto":
        "Anne, muito obrigado. Você não sabe o quanto está me ajudando. Há anos tento encontrar respostas como essas. Hoje sorrio um pouco mais graças a você. Vou colocar em prática nestes dias.",
    "depo-1-nome": "Dante",
    "depo-1-cargo": "2025",

    "depo-2-texto":
        "Olá querida Anne, queria agradecer pela acolhida que nos deu durante todo o curso, por compartilhar conosco seus conhecimentos e pela sua ajuda em todos os momentos. Muito obrigada por tudo.",
    "depo-2-nome": "Angie",
    "depo-2-cargo": "2025",

    "depo-3-texto":
        "Um workshop incrível! Muitas viradas de chave, aprendizados e novos olhares! Foi algo super necessário para me reconhecer. Um caminho de autoconhecimento. Gratidão Anne, amei demais participar!",
    "depo-3-nome": "Helen",
    "depo-3-cargo": "2025",

    "depo-4-texto":
        "Sinceramente, foi a melhor coisa que me aconteceu no ano. Cada tema que íamos vendo refletia na realidade, era incrível como tudo se conectava. O que venho curando é maravilhoso. Voltei a ter relação com meus pais de uma maneira diferente. Eu com certeza recomendaria para qualquer pessoa, porque me ajudou muito. Tornei consciente muitas coisas que eu não sabia. E como você conduz, Anne, é muito bonito, muito amoroso, tudo flui naturalmente. Gratidão de todo coração por tudo.",
    "depo-4-nome": "Catalina",
    "depo-4-cargo": "2025",

    "depo-5-texto":
        "Passando para dizer que estou sentindo falta dos nossos encontros! Foi muito bom estar com vocês neste ano, mesmo que virtualmente. O workshop me mostrou que, apesar do autoconhecimento ser um processo individual, ele fica muito mais leve com companhia. Obrigada Anne e Helen por me acompanharem nessa jornada. Desejo boas celebrações e uma ótima virada de ano para nós.",
    "depo-5-nome": "Paula",
    "depo-5-cargo": "2025",

    "depo-6-texto":
        "Olá Anne! Aquela situação da minha amiga que eu abordei na última constelação se desbloqueou no mesmo dia e no dia seguinte. Incrível.",
    "depo-6-nome": "Carol",
    "depo-6-cargo": "2026",

    "agenda-titulo": "Agende sua sessão",
    "agenda-subtitulo":
        "Escolha o dia e o horário que melhor se encaixam na sua rotina.",
    "label-servico": "Serviço",
    "opt-servico-placeholder": "Selecione um serviço",
    "opt-servico-5": "Sessão de Avaliação",
    "opt-servico-6": "Cursos",
    "label-data": "Data",
    "label-horario": "Horário",
    "opt-horario-placeholder": "Selecione um horário",
    "opt-horario-1": "Manhã (9h–12h)",
    "opt-horario-2": "Tarde (14h–17h)",
    "opt-horario-3": "Noite (18h–20h)",
    "btn-agendar-agora": "Agendar agora",
    "msg-agendamento-sucesso":
        "Recebemos sua solicitação! Em breve entraremos em contato para confirmar o horário.",
    "msg-agendamento-erro":
        "Por favor, preencha todos os campos antes de continuar.",

    "rodape-tagline":
        "Acompanhamento terapêutico para a sua transformação e crescimento pessoal.",
    "rodape-col-navegacao": "Navegação",
    "rodape-col-terapias": "Terapias",
    "rodape-col-newsletter": "Newsletter",
    "rodape-newsletter-texto":
        "Receba reflexões, novidades sobre cursos e conteúdos exclusivos diretamente no seu e-mail.",
    "placeholder-email": "Seu e-mail",
    "btn-inscrever": "Inscrever-se",
    "rodape-privacidade": "Política de Privacidade",
    "rodape-termos": "Termos e Condições",
    "rodape-copyright":
        "© 2026 Espiral de Sabedoria. Todos os direitos reservados.",
    "msg-newsletter-sucesso":
        "Inscrição realizada com sucesso! Em breve você receberá nossas novidades.",
    },
    es: {
    "nav-inicio": "Inicio",
    "nav-sobre": "Sobre mí",
    "nav-terapias": "Terapias",
    "nav-cursos": "Cursos",
    "nav-faq": "FAQ",
    "nav-depoimentos": "Testimonios",
    "nav-contato": "Contacto",
    "default-wa" : "Hola Anne, vine desde tu sitio web y me gustaría más información.",

    "hero-etiqueta": "Acompañamiento terapéutico",
    "hero-titulo":
        'Acompañando procesos de <em class="destaque">transformación</em> y crecimiento personal',
    "hero-texto":
        "Un espacio seguro y acogedor para reconectar contigo misma, resignificar historias y dar los próximos pasos con más claridad, ligereza y propósito.",
    "btn-agendar-sessao": "Agendar sesión",
    "btn-conhecer-mais": "Conocer más",

    "sobre-etiqueta": "Sobre mí",
    "sobre-titulo": "Un camino de escucha, presencia y transformación",
    "sobre-p1":
        "Mi camino de autoconocimiento comenzó en 2018, en un momento de profunda transformación en mi vida, cuando necesité mirar hacia adentro y encontrar nuevos caminos. Fue a partir de esa experiencia que nació una búsqueda por comprenderme mejor, comprender al ser humano y los procesos de evolución personal.",
    "sobre-p2":
        "A lo largo de ese camino, encontré una nueva forma de ver la vida y también descubrí mi propósito: acompañar a otras personas en sus propios procesos de sanación, conciencia y transformación. Hoy utilizo herramientas de sabiduría ancestral y terapias que comprenden al ser humano de forma integral — alma, mente, cuerpo y emociones.",
    "btn-mais-sobre-mim": "Más sobre mí",

    "terapias-titulo": "Terapias",
    "terapias-subtitulo":
        "Cada proceso es único. Conoce los enfoques que utilizo para acompañar tu camino de sanación y autoconocimiento, siempre respetando tu ritmo.",
    "terapia1-titulo": "Constelaciones Familiares en el Agua",
    "terapia1-texto":
        "Un proceso de conciencia sobre el origen de los bloqueos y conflictos, comprendiendo la dinámica familiar detrás de estas experiencias y permitiendo nuevas perspectivas para transformar tu relación contigo misma y con el mundo.",
    "terapia2-titulo": "Lectura de Registros Akáshicos",
    "terapia2-texto":
        "En conexión con tus maestros y guías, esta lectura permite acceder a mensajes e insights importantes para tu camino, aportando más claridad, conciencia y orientación para tu momento actual.",
    "terapia3-titulo": "Tarot Evolutivo, Sistémico y Transgeneracional",
    "terapia3-texto":
        "Una herramienta de autoconocimiento que permite acceder al inconsciente, identificar bloqueos y patrones, acogiendo aquello que necesita ser transformado y recibiendo una orientación para continuar tu camino.",
    "terapia4-titulo": "Reiki",
    "terapia4-texto":
        "Una terapia de armonización energética mediante la canalización de energía de sanación, ayudando al equilibrio energético, la relajación y el acompañamiento en momentos de transformación emocional.",
    "terapia5-titulo": "Péndulo",
    "terapia5-texto":
        "Una herramienta utilizada para la armonización energética, desbloqueos, limpiezas y potenciación de proyectos, deseos y espacios, buscando equilibrio en diferentes áreas de la vida.",
    "link-saber-mais": "Saber más",

    "cursos-etiqueta": "Constelaciones Familiares",
    "cursos-titulo": "Cursos y talleres para tu desarrollo personal",
    "cursos-subtitulo": "Con especialidad en el Agua",
    "cursos-texto":
        "Programas presenciales y en línea pensados para quienes desean ir más allá de las sesiones individuales — herramientas prácticas de autoconocimiento, regulación emocional y conexión espiritual para aplicar en el día a día.",

    "btn-ver-cursos": "Ver detalles e inscripción",

    "cursos-tag-1": "Online · 12 meses",
    "cursos-tag-2": "Clases en vivo y grabadas",
    "cursos-tag-3": "Inicio 18 de agosto 2026",

    "cursos-aprende-titulo": "Lo que vas a aprender",

    "aprende-1-titulo": "Escucha terapéutica",
    "aprende-1-texto":
        "Aprender a escuchar más allá de las palabras, identificando lo que el consultante expresa de forma consciente e inconsciente.",

    "aprende-2-titulo": "Mirada sistémica profunda",
    "aprende-2-texto":
        "Comprender cómo vínculos, lealtades invisibles e historias familiares influyen en las experiencias presentes.",

    "aprende-3-titulo": "Estados del ser",
    "aprende-3-texto":
        "Reconocer cuando una persona está en Estado Niño, Víctima, Juez o Adulto, y cómo acompañarla hacia la conciencia y responsabilidad personal.",

    "aprende-4-titulo": "Arte de observar sin juzgar",
    "aprende-4-texto":
        "Desarrollar una actitud interna basada en la presencia, el respeto y la observación fenomenológica.",

    "aprende-5-titulo": "Frases sanadoras",
    "aprende-5-texto":
        "Utilizar palabras que facilitan procesos de integración, reconocimiento y transformación dentro del sistema familiar.",

    "aprende-6-titulo": "Terapia transgeneracional",
    "aprende-6-texto":
        "Incorporar conceptos como Proyecto Sentido, Lealtades Invisibles, Memoria Familiar y Ciclos Biológicos Memorizables.",

    "aprende-7-titulo": "Cartas Sabiduría en Espiral®",
    "aprende-7-texto":
        "Utilizar cartas terapéuticas como recurso complementario en sesiones individuales, autoconstelaciones y acompañamiento.",

    "aprende-8-titulo": "Constelaciones individuales en el Agua ✦",
    "aprende-8-texto":
        "Metodología única para observar dinámicas sistémicas a través del movimiento de los elementos en el agua, ampliando la comprensión del campo y del proceso terapéutico.",

    "aprende-9-titulo": "Actos simbólicos y recursos",
    "aprende-9-texto":
        "Conocer diferentes ejercicios y herramientas para acompañar procesos más allá de la constelación.",

    "cursos-inclui-titulo": "Qué incluye",

    "inclui-1": "16 módulos de formación",
    "inclui-2": "Especialización en Constelaciones Individuales en el Agua",
    "inclui-3": "Material de estudio",
    "inclui-4": "Prácticas supervisadas",
    "inclui-5": "Grabaciones de las clases",
    "inclui-6": "Grupo de acompañamiento",
    "inclui-7": "Certificado de formación",

    "cursos-invest-titulo": "Inversión",

    "cursos-preco-mensal": "USD 60",
    "cursos-preco-mensal-label": "por mes · 12 cuotas",

    "cursos-ou": "o",

    "cursos-preco-total": "USD 690",
    "cursos-preco-total-label": "pago único · ahorra USD 30",

    "cursos-pagamentos":
        "Formas de pago: PayPal, Wise, link de pago, Prex, Pix.",

    "cursos-formato-1": "En línea",
    "cursos-formato-2": "12 meses",
    "cursos-formato-3": "1h30 semanales",
    "cursos-formato-4": "Clases en vivo y grabadas",
    "cursos-formato-5": "Inicio 18 de agosto 2026",

    "btn-inscrever-curso": "Quiero inscribirme",

    "curso2-etiqueta": "Formación especializada",
    "curso2-subtitulo": "Constelaciones Familiares en el Agua",
    "curso2-texto": "Una formación práctica para consteladores y terapeutas que desean profundizar su práctica a través del trabajo con constelaciones en el agua, desarrollando escucha sistémica, percepción del campo y seguridad en la facilitación.",

    "curso2-tag-1": "En línea · 3 meses",
    "curso2-tag-2": "Clases cada 15 días",
    "curso2-tag-3": "Inicio 22 de agosto",

    "curso2-btn-ver": "Ver detalles e inscripción",

    "curso2-aprende-titulo": "Lo que vas a aprender",

    "curso2-aprende-1-titulo": "Práctica de constelaciones",
    "curso2-aprende-1-texto": "Vivir prácticas de constelación utilizando el agua como recurso de observación y profundización del campo sistémico.",

    "curso2-aprende-2-titulo": "Lectura del movimiento en el agua",
    "curso2-aprende-2-texto": "Desarrollar la percepción sobre los movimientos e informaciones que surgen a través de los elementos en el campo del agua.",

    "curso2-aprende-3-titulo": "Escucha sistémica",
    "curso2-aprende-3-texto": "Profundizar la capacidad de escuchar más allá de las palabras, percibiendo movimientos y dinámicas del sistema.",

    "curso2-aprende-4-titulo": "Presencia del facilitador",
    "curso2-aprende-4-texto": "Fortalecer la presencia, confianza y seguridad para acompañar procesos de constelación.",

    "curso2-aprende-5-titulo": "Intuición y percepción",
    "curso2-aprende-5-texto": "Conectarse con la percepción interna del facilitador y los movimientos que guían el proceso.",

    "curso2-aprende-6-titulo": "Lectura del campo",
    "curso2-aprende-6-texto": "Ampliar la comprensión del campo sistémico y sus manifestaciones durante una sesión.",

    "curso2-aprende-7-titulo": "Diferentes caminos de las constelaciones",
    "curso2-aprende-7-texto": "Respetar e integrar diferentes experiencias y enfoques dentro de las Constelaciones Familiares.",

    "curso2-aprende-8-titulo": "Constelaciones en el Agua ✦",
    "curso2-aprende-8-texto": "Explorar una metodología práctica utilizando el agua como medio de observación de los movimientos sistémicos.",

    "curso2-aprende-9-titulo": "Práctica e integración",
    "curso2-aprende-9-texto": "Crear un espacio de intercambio, aprendizaje compartido y desarrollo de la propia forma de facilitar.",

    "curso2-inclui-titulo": "Qué incluye",

    "curso2-inclui-1": "7 encuentros online en vivo",
    "curso2-inclui-2": "Duración de 3 meses",
    "curso2-inclui-3": "Clases cada 15 días",
    "curso2-inclui-4": "Grabación de las clases",
    "curso2-inclui-5": "Prácticas supervisadas",
    "curso2-inclui-6": "Material de apoyo",
    "curso2-inclui-7": "Grupo de acompañamiento",

    "curso2-invest-titulo": "Inversión",

    "curso2-preco-mensal": "USD 70",
    "curso2-preco-mensal-label": "por mes",

    "curso2-ou": "o",

    "curso2-preco-total": "USD 195",
    "curso2-preco-total-label": "formación completa",

    "curso2-pagamentos": "Formas de pago: PayPal, Wise, enlace de pago, Prex, Pix.",

    "curso2-formato-1": "En línea",
    "curso2-formato-2": "3 meses",
    "curso2-formato-3": "Sábados cada 15 días",
    "curso2-formato-4": "Clases en vivo y grabadas",
    "curso2-formato-5": "Inicio 22 de agosto de 2026",

    "curso2-btn-inscrever": "Quiero inscribirme",

    "inscricao-curso1": "Hola Anne, me gustaría inscribirme en el curso de Constelaciones Familiares con especialidad en el agua.",
    "inscricao-curso2": "Hola Anne, me gustaría inscribirme en el curso de especialización en Constelaciones Familiares en el Agua.",

    "faq-titulo": "Preguntas frecuentes",
    "faq-subtitulo":
        "Resuelve tus dudas antes de iniciar tu proceso terapéutico. Si no encuentras la respuesta que buscas, escríbeme directamente.",
    "faq1-pergunta":
        "¿Necesito alguna derivación para iniciar el acompañamiento?",
    "faq1-resposta":
        "No. Puedes entrar en contacto directamente conmigo, sin necesidad de indicación médica o psicológica. En la primera sesión, conversamos sobre tu momento y definimos juntas el mejor camino. Sin embargo, para las constelaciones familiares, si estás realizando un seguimiento psiquiátrico, es necesario consultar al profesional que te está acompañando para verificar si estás autorizado a hacerlo.",
    "faq2-pergunta": "¿Las sesiones son online o presenciales?",
    "faq2-resposta":
        "Ofrezco ambas modalidades. Las sesiones online se realizan por videollamada, con la misma calidad de presencia y acogida que las sesiones presenciales.",
    "faq3-pergunta": "¿Con qué frecuencia debo hacer las sesiones?",
    "faq3-resposta":
        "Cada proceso es único. Generalmente recomiendo encuentros semanales o quincenales al inicio, ajustando la frecuencia según tu evolución y necesidades.",
    "faq4-pergunta": "¿Qué son las Constelaciones Familiares?",
    "faq4-resposta":
        "Es un enfoque que revela dinámicas y patrones invisibles transmitidos entre generaciones, ayudando a comprender y transformar conflictos que se repiten en tu historia.",
    "faq5-pergunta": "¿Cómo agendo mi primera sesión?",
    "faq5-resposta":
        "Solo completa el formulario de agendamiento a continuación o envía un mensaje por WhatsApp. En pocas horas te responderé para confirmar el mejor horario para ti.",

    "depo-titulo": "Testimonios",
    "depo-subtitulo":
        "Historias reales de personas que encontraron una nueva mirada sobre sí mismas a través del acompañamiento terapéutico.",

    "depo-1-texto":
        "Anne, muchas gracias. No sabes cuánto me estás ayudando. Llevo años tratando de encontrar respuestas como estas. Hoy sonrío un poco más gracias a ti. Lo voy a poner en práctica estos días.",
    "depo-1-nome": "Dante",
    "depo-1-cargo": "2025",

    "depo-2-texto":
        "Hola querida Anne, quería agradecerte por la calidez que nos diste durante todo el curso, por compartir con nosotras tus conocimientos y por tu ayuda en todo momento. Muchas gracias por todo.",
    "depo-2-nome": "Angie",
    "depo-2-cargo": "2025",

    "depo-3-texto":
        "¡Un workshop increíble! Muchos cambios de perspectiva, aprendizajes y nuevas miradas. Fue algo muy necesario para reconocerme. Un camino de autoconocimiento. Gratitud Anne, me encantó participar.",
    "depo-3-nome": "Helen",
    "depo-3-cargo": "2025",

    "depo-4-texto":
        "Sinceramente, fue lo mejor que me pasó en el año. Cada tema que veíamos se reflejaba en la realidad, era increíble cómo todo se conectaba. Lo que vengo sanando es maravilloso. Volví a tener relación con mis padres de una manera diferente. Recomiendo totalmente este proceso porque me ayudó muchísimo. Anne lo guía de una forma muy amorosa y todo fluye naturalmente. Gratitud de todo corazón.",
    "depo-4-nome": "Catalina",
    "depo-4-cargo": "2025",

    "depo-5-texto":
        "Paso a decir que estoy sintiendo la falta de nuestros encuentros. Fue muy bueno compartir este año con ustedes, aunque sea virtualmente. El workshop mostró que, aunque el autoconocimiento es individual, se vuelve más liviano con compañía. Gracias Anne y Helen por acompañarme en esta jornada. Deseo felices celebraciones y un buen fin de año para nosotros.",
    "depo-5-nome": "Paula",
    "depo-5-cargo": "2025",

    "depo-6-texto":
        "¡Hola Anne! Aquella situación de mi amiga que abordé en la última constelación se desbloqueó el mismo día y al día siguiente. Increíble.",
    "depo-6-nome": "Carol",
    "depo-6-cargo": "2026",

    "agenda-titulo": "Agenda tu sesión",
    "agenda-subtitulo":
        "Elige el día y el horario que mejor se adapten a tu rutina.",
    "label-servico": "Servicio",
    "opt-servico-placeholder": "Selecciona un servicio",
    "opt-servico-5": "Sesión de Evaluación",
    "opt-servico-6": "Cursos",
    "label-data": "Fecha",
    "label-horario": "Horario",
    "opt-horario-placeholder": "Selecciona un horario",
    "opt-horario-1": "Mañana (9h–12h)",
    "opt-horario-2": "Tarde (14h–17h)",
    "opt-horario-3": "Noche (18h–20h)",
    "btn-agendar-agora": "Agendar ahora",
    "msg-agendamento-sucesso":
        "¡Recibimos tu solicitud! Pronto nos pondremos en contacto para confirmar el horario.",
    "msg-agendamento-erro":
        "Por favor, completa todos los campos antes de continuar.",

    "rodape-tagline":
        "Acompañamiento terapéutico para tu transformación y crecimiento personal.",
    "rodape-col-navegacao": "Navegación",
    "rodape-col-terapias": "Terapias",
    "rodape-col-newsletter": "Newsletter",
    "rodape-newsletter-texto":
        "Recibe reflexiones, novedades sobre cursos y contenidos exclusivos directamente en tu correo.",
    "placeholder-email": "Tu correo",
    "btn-inscrever": "Suscribirme",
    "rodape-privacidade": "Política de Privacidad",
    "rodape-termos": "Términos y Condiciones",
    "rodape-copyright":
        "© 2026 Espiral de Sabiduría. Todos los derechos reservados.",
    "msg-newsletter-sucesso":
        "¡Suscripción realizada con éxito! Pronto recibirás nuestras novedades.",
    },
    en: {
    "nav-inicio": "Home",
    "nav-sobre": "About me",
    "nav-terapias": "Therapies",
    "nav-cursos": "Courses",
    "nav-faq": "FAQ",
    "nav-depoimentos": "Testimonials",
    "nav-contato": "Contact",
    "default-wa": "Hello Anne, I came from your website and would like more information.",

    "hero-etiqueta": "Therapeutic support",
    "hero-titulo":
        'Accompanying processes of <em class="destaque">transformation</em> and personal growth',
    "hero-texto":
        "A safe and welcoming space for you to reconnect with yourself, reframe your story, and take the next steps with more clarity, lightness, and purpose.",
    "btn-agendar-sessao": "Book a session",
    "btn-conhecer-mais": "Learn more",

    "sobre-etiqueta": "About me",
    "sobre-titulo": "A path of listening, presence and transformation",
    "sobre-p1":
        "My journey of self-knowledge began in 2018, during a profound moment of transformation in my life, when I needed to look within and find new paths. From that experience, a search was born to better understand myself, the human being, and the processes of personal evolution.",
    "sobre-p2":
        "Along this path, I found a new way of seeing life and also discovered my purpose: to accompany other people in their own journeys of healing, awareness, and transformation. Today I use tools of ancestral wisdom and therapies that understand the human being in an integral way — soul, mind, body, and emotions.",
    "btn-mais-sobre-mim": "More about me",

    "terapias-titulo": "Therapies",
    "terapias-subtitulo":
        "Each process is unique. Discover the approaches I use to support your healing and self-knowledge journey, always at your own pace.",
    "terapia1-titulo": "Family Constellations in Water",
    "terapia1-texto":
        "A process of awareness about the origin of emotional blocks and conflicts, understanding the family dynamics behind these experiences and creating new perspectives for transformation.",
    "terapia2-titulo": "Akashic Records Reading",
    "terapia2-texto":
        "Connected with your masters and guides, this reading allows access to meaningful messages and insights for your journey, bringing clarity, awareness and guidance for your current moment.",
    "terapia3-titulo": "Evolutionary, Systemic and Transgenerational Tarot",
    "terapia3-texto":
        "A self-knowledge tool that allows access to the unconscious, identifying blocks and patterns while welcoming what needs transformation and offering guidance for your next steps.",
    "terapia4-titulo": "Reiki",
    "terapia4-texto":
        "An energetic harmonization therapy through healing energy channeling, helping restore balance, relaxation and support during intense emotional processes.",
    "terapia5-titulo": "Pendulum",
    "terapia5-texto":
        "A tool used for energetic harmonization, block removal, cleansing and strengthening projects, intentions and environments.",
    "link-saber-mais": "Learn more",

    "cursos-etiqueta": "Family Constellations",
    "cursos-titulo": "Courses and workshops for your personal development",
    "cursos-subtitulo": "Specialized in Water",
    "cursos-texto":
        "In-person and online programs designed for those who want to go beyond individual sessions — practical tools for self-knowledge, emotional regulation, and spiritual connection to apply in daily life.",

    "btn-ver-cursos": "View details and registration",

    "cursos-tag-1": "Online · 12 months",
    "cursos-tag-2": "Live and recorded classes",
    "cursos-tag-3": "Starting August 18, 2026",

    "cursos-aprende-titulo": "What you will learn",

    "aprende-1-titulo": "Therapeutic listening",
    "aprende-1-texto":
        "Learn to listen beyond words, identifying what the client expresses consciously and unconsciously.",

    "aprende-2-titulo": "Deep systemic view",
    "aprende-2-texto":
        "Understand how bonds, invisible loyalties, and family histories influence present experiences.",

    "aprende-3-titulo": "States of being",
    "aprende-3-texto":
        "Recognize when a person is in Child, Victim, Judge, or Adult state, and how to guide them toward awareness and responsibility.",

    "aprende-4-titulo": "The art of non-judgmental observation",
    "aprende-4-texto":
        "Develop an internal attitude based on presence, respect, and phenomenological observation.",

    "aprende-5-titulo": "Healing phrases",
    "aprende-5-texto":
        "Use words that facilitate processes of integration, recognition, and transformation within the family system.",

    "aprende-6-titulo": "Transgenerational therapy",
    "aprende-6-texto":
        "Incorporate concepts such as Meaning Project, Invisible Loyalties, Family Memory, and Memorized Biological Cycles.",

    "aprende-7-titulo": "Spiral Wisdom Cards®",
    "aprende-7-texto":
        "Use therapeutic cards as a complementary resource in individual sessions, self-constellations, and guidance processes.",

    "aprende-8-titulo": "Individual Constellations in Water ✦",
    "aprende-8-texto":
        "A unique methodology to observe systemic dynamics through the movement of elements in water, expanding understanding of the field and therapeutic process.",

    "aprende-9-titulo": "Symbolic acts and tools",
    "aprende-9-texto":
        "Learn different exercises and tools to support processes beyond constellation work.",

    "cursos-inclui-titulo": "What’s included",

    "inclui-1": "16 training modules",
    "inclui-2": "Specialization in Individual Constellations in Water",
    "inclui-3": "Study materials",
    "inclui-4": "Supervised practice",
    "inclui-5": "Class recordings",
    "inclui-6": "Support group",
    "inclui-7": "Certification",

    "cursos-invest-titulo": "Investment",

    "cursos-preco-mensal": "USD 60",
    "cursos-preco-mensal-label": "per month · 12 installments",

    "cursos-ou": "or",

    "cursos-preco-total": "USD 690",
    "cursos-preco-total-label": "one-time payment · save USD 30",

    "cursos-pagamentos":
        "Payment methods: PayPal, Wise, payment link, Prex, Pix.",

    "cursos-formato-1": "Online",
    "cursos-formato-2": "12 months",
    "cursos-formato-3": "1h30 weekly",
    "cursos-formato-4": "Live and recorded classes",
    "cursos-formato-5": "Starting August 18, 2026",

    "btn-inscrever-curso": "Enroll now",

    "curso2-etiqueta": "Specialized Training",
    "curso2-subtitulo": "Family Constellations in Water",
    "curso2-texto": "A practical training for constellation facilitators and therapists who want to deepen their practice through water-based constellations, developing systemic listening, field perception and facilitation safety.",

    "curso2-tag-1": "Online · 3 months",
    "curso2-tag-2": "Classes every 15 days",
    "curso2-tag-3": "Start August 22",

    "curso2-btn-ver": "View details and enrollment",

    "curso2-aprende-titulo": "What you will learn",

    "curso2-aprende-1-titulo": "Constellation practice",
    "curso2-aprende-1-texto": "Experience constellation practices using water as a tool for observation and deepening of the systemic field.",

    "curso2-aprende-2-titulo": "Reading movement in water",
    "curso2-aprende-2-texto": "Develop perception of movements and information that emerge through elements in the water field.",

    "curso2-aprende-3-titulo": "Systemic listening",
    "curso2-aprende-3-texto": "Deepen the ability to listen beyond words, perceiving movements and system dynamics.",

    "curso2-aprende-4-titulo": "Facilitator presence",
    "curso2-aprende-4-texto": "Strengthen presence, confidence and safety in guiding constellation processes.",

    "curso2-aprende-5-titulo": "Intuition and perception",
    "curso2-aprende-5-texto": "Connect with the facilitator’s inner perception and the movements that guide the process.",

    "curso2-aprende-6-titulo": "Field reading",
    "curso2-aprende-6-texto": "Expand understanding of the systemic field and its manifestations during a session.",

    "curso2-aprende-7-titulo": "Different paths of constellations",
    "curso2-aprende-7-texto": "Respect and integrate different experiences and approaches within Family Constellations.",

    "curso2-aprende-8-titulo": "Constellations in Water ✦",
    "curso2-aprende-8-texto": "Explore a practical methodology using water as a medium to observe systemic movements.",

    "curso2-aprende-9-titulo": "Practice and integration",
    "curso2-aprende-9-texto": "Create a space for exchange, shared learning and development of one’s own facilitation style.",

    "curso2-inclui-titulo": "What’s included",

    "curso2-inclui-1": "7 live online sessions",
    "curso2-inclui-2": "3-month duration",
    "curso2-inclui-3": "Classes every 15 days",
    "curso2-inclui-4": "Class recordings",
    "curso2-inclui-5": "Supervised practice",
    "curso2-inclui-6": "Support material",
    "curso2-inclui-7": "Support group",

    "curso2-invest-titulo": "Investment",

    "curso2-preco-mensal": "USD 70",
    "curso2-preco-mensal-label": "per month",

    "curso2-ou": "or",

    "curso2-preco-total": "USD 195",
    "curso2-preco-total-label": "full program",

    "curso2-pagamentos": "Payment methods: PayPal, Wise, payment link, Prex, Pix.",

    "curso2-formato-1": "Online",
    "curso2-formato-2": "3 months",
    "curso2-formato-3": "Saturdays every 15 days",
    "curso2-formato-4": "Live and recorded classes",
    "curso2-formato-5": "Start August 22, 2026",

    "curso2-btn-inscrever": "Enroll now",

    "inscricao-curso1": "Hello Anne, I would like to enroll in the Family Constellations course specialized in water.",
    "inscricao-curso2": "Hello Anne, I would like to enroll in the specialization course in Family Constellations in Water.",

    "faq-titulo": "Frequently asked questions",
    "faq-subtitulo":
        "Get your questions answered before starting your therapeutic process. If you can't find what you're looking for, reach out to me directly.",
    "faq1-pergunta": "Do I need a referral to start the process?",
    "faq1-resposta":
        "No. You can contact me directly, without the need for medical or psychological referral. In the first session, we talk about your current moment and together define the best path. However, for family constellations, if you are undergoing psychiatric treatment, it is necessary to consult the professional responsible for your care to verify whether you are authorized to proceed.",
    "faq2-pergunta": "Are sessions online or in-person?",
    "faq2-resposta":
        "I offer both options. Online sessions take place via video call, with the same quality of presence and care as in-person sessions.",
    "faq3-pergunta": "How often should I have sessions?",
    "faq3-resposta":
        "Each process is unique. I generally recommend weekly or fortnightly sessions at the start, adjusting the frequency as you evolve and according to your needs.",
    "faq4-pergunta": "What are Family Constellations?",
    "faq4-resposta":
        "It is an approach that reveals invisible dynamics and patterns passed down through generations, helping to understand and transform conflicts that repeat in your history.",
    "faq5-pergunta": "How do I book my first session?",
    "faq5-resposta":
        "Simply fill in the booking form below or send a WhatsApp message. I will get back to you within a few hours to confirm the best time for you.",

    "depo-titulo": "Testimonials",
    "depo-subtitulo":
        "Real stories from people who found a new perspective on themselves through therapeutic support.",

    "depo-1-texto":
        "Anne, thank you so much. You don’t know how much you are helping me. I have spent years trying to find answers like these. Today I smile a little more thanks to you. I will put it into practice these days.",
    "depo-1-nome": "Dante",
    "depo-1-cargo": "2025",

    "depo-2-texto":
        "Dear Anne, I wanted to thank you for the warmth you shared throughout the course, for sharing your knowledge with us, and for your constant support. Thank you so much for everything.",
    "depo-2-nome": "Angie",
    "depo-2-cargo": "2025",

    "depo-3-texto":
        "An incredible workshop! So many shifts in perspective, learning, and new ways of seeing things. It was exactly what I needed to reconnect with myself. A journey of self-knowledge. Gratitude Anne, I loved participating.",
    "depo-3-nome": "Helen",
    "depo-3-cargo": "2025",

    "depo-4-texto":
        "Honestly, it was the best thing that happened to me this year. Every topic we explored reflected in real life, it was incredible how everything connected. The healing process I am going through is wonderful. I reconnected with my parents in a different way. I would definitely recommend it to anyone because it helped me a lot. I became aware of many things I didn’t know. And the way you guide, Anne, is beautiful and very loving, everything flows naturally. Deep gratitude from my heart.",
    "depo-4-nome": "Catalina",
    "depo-4-cargo": "2025",

    "depo-5-texto":
        "Just wanted to say I’m really missing our meetings! It was wonderful being with you this year, even if virtually. The workshop showed me that although self-knowledge is an individual process, it becomes much lighter with company. Thank you Anne and Helen for accompanying me on this journey. Wishing happy celebrations and a great year end for us.",
    "depo-5-nome": "Paula",
    "depo-5-cargo": "2025",

    "depo-6-texto":
        "Hi Anne! That situation with my friend I brought up in the last constellation resolved itself on the same day and the next day. Incredible.",
    "depo-6-nome": "Carol",
    "depo-6-cargo": "2026",

    "agenda-titulo": "Book your session",
    "agenda-subtitulo":
        "Choose the day and time that best fits your routine.",
    "label-servico": "Service",
    "opt-servico-placeholder": "Select a service",
    "opt-servico-5": "Assessment Session",
    "opt-servico-6": "Courses",
    "label-data": "Date",
    "label-horario": "Time",
    "opt-horario-placeholder": "Select a time",
    "opt-horario-1": "Morning (9am–12pm)",
    "opt-horario-2": "Afternoon (2pm–5pm)",
    "opt-horario-3": "Evening (6pm–8pm)",
    "btn-agendar-agora": "Book now",
    "msg-agendamento-sucesso":
        "We received your request! We will be in touch shortly to confirm your appointment.",
    "msg-agendamento-erro": "Please fill in all fields before continuing.",

    "rodape-tagline":
        "Therapeutic support for your transformation and personal growth.",
    "rodape-col-navegacao": "Navigation",
    "rodape-col-terapias": "Therapies",
    "rodape-col-newsletter": "Newsletter",
    "rodape-newsletter-texto":
        "Receive reflections, course updates, and exclusive content directly in your inbox.",
    "placeholder-email": "Your email",
    "btn-inscrever": "Subscribe",
    "rodape-privacidade": "Privacy Policy",
    "rodape-termos": "Terms & Conditions",
    "rodape-copyright": "© 2026 Espiral de Sabedoria. All rights reserved.",
    "msg-newsletter-sucesso":
        "Successfully subscribed! You will soon receive our updates.",
    },
    fr: {
    "nav-inicio": "Accueil",
    "nav-sobre": "À propos",
    "nav-terapias": "Thérapies",
    "nav-cursos": "Cours",
    "nav-faq": "FAQ",
    "nav-depoimentos": "Témoignages",
    "nav-contato": "Contact",
    "default-wa": "Bonjour Anne, je viens de votre site web et je voudrais plus d'informations.",

    "hero-etiqueta": "Accompagnement thérapeutique",
    "hero-titulo":
        'Accompagner les processus de <em class="destaque">transformation</em> et de croissance personnelle',
    "hero-texto":
        "Un espace sûr et bienveillant pour vous reconnecter à vous-même, redéfinir votre histoire et avancer avec plus de clarté, de légèreté et de sens.",
    "btn-agendar-sessao": "Prendre rendez-vous",
    "btn-conhecer-mais": "En savoir plus",

    "sobre-etiqueta": "À propos de moi",
    "sobre-titulo": "Un chemin d'écoute, de présence et de transformation",
    "sobre-p1":
        "Mon parcours de connaissance de soi a commencé en 2018, lors d’un moment de profonde transformation dans ma vie, lorsque j’ai dû me tourner vers l’intérieur et trouver de nouveaux chemins. C’est à partir de cette expérience qu’est née une recherche pour mieux me comprendre, comprendre l’être humain et les processus d’évolution personnelle.",
    "sobre-p2":
        "Tout au long de ce chemin, j’ai trouvé une nouvelle façon de voir la vie et j’ai également découvert ma mission : accompagner d’autres personnes dans leurs propres parcours de guérison, de conscience et de transformation. Aujourd’hui, j’utilise des outils de sagesse ancestrale et des thérapies qui comprennent l’être humain de manière intégrale — âme, esprit, corps et émotions.",
    "btn-mais-sobre-mim": "En savoir plus sur moi",

    "terapias-titulo": "Thérapies",
    "terapias-subtitulo":
        "Chaque processus est unique. Découvrez les approches que j'utilise pour soutenir votre chemin de guérison et de connaissance de soi, toujours à votre rythme.",
    "terapia1-titulo": "Constellations Familiales dans l’Eau",
    "terapia1-texto":
        "Un processus de prise de conscience de l’origine des blocages et des conflits, permettant de comprendre les dynamiques familiales et d’apporter de nouvelles perspectives de transformation.",
    "terapia2-titulo": "Lecture des Archives Akashiques",
    "terapia2-texto":
        "En connexion avec vos maîtres et guides, cette lecture permet d’accéder aux messages et aux compréhensions nécessaires à votre cheminement.",
    "terapia3-titulo": "Tarot Évolutif, Systémique et Transgénérationnel",
    "terapia3-texto":
        "Un outil de connaissance de soi permettant d’accéder à l’inconscient, de comprendre les blocages et d’accueillir ce qui demande transformation avec amour et conscience.",
    "terapia4-titulo": "Reiki",
    "terapia4-texto":
        "Une thérapie d’harmonisation énergétique basée sur la canalisation d’une énergie de guérison, favorisant l’équilibre, la détente et l’accompagnement émotionnel.",
    "terapia5-titulo": "Pendule",
    "terapia5-texto":
        "Un outil utilisé pour l’harmonisation énergétique, les libérations, les nettoyages et l’accompagnement de projets, intentions et espaces.",
    "link-saber-mais": "En savoir plus",

    "cursos-etiqueta": "Constellations Familiales",
    "cursos-titulo": "Cours et ateliers pour votre développement personnel",
    "cursos-subtitulo": "Spécialisé dans l’Eau",
    "cursos-texto":
        "Programmes en présentiel et en ligne conçus pour ceux qui souhaitent aller au-delà des séances individuelles — outils pratiques de connaissance de soi, de régulation émotionnelle et de connexion spirituelle à appliquer au quotidien.",

    "btn-ver-cursos": "Voir les détails et inscription",

    "cursos-tag-1": "En ligne · 12 mois",
    "cursos-tag-2": "Cours en direct et enregistrés",
    "cursos-tag-3": "Début 18 août 2026",

    "cursos-aprende-titulo": "Ce que vous allez apprendre",

    "aprende-1-titulo": "Écoute thérapeutique",
    "aprende-1-texto":
        "Apprendre à écouter au-delà des mots, en identifiant ce que le consultant exprime consciemment et inconsciemment.",

    "aprende-2-titulo": "Regard systémique profond",
    "aprende-2-texto":
        "Comprendre comment les liens, loyautés invisibles et histoires familiales influencent les expériences présentes.",

    "aprende-3-titulo": "États de l’être",
    "aprende-3-texto":
        "Reconnaître quand une personne est en état Enfant, Victime, Juge ou Adulte, et comment l’accompagner vers la conscience et la responsabilité personnelle.",

    "aprende-4-titulo": "Art de l’observation sans jugement",
    "aprende-4-texto":
        "Développer une attitude intérieure basée sur la présence, le respect et l’observation phénoménologique.",

    "aprende-5-titulo": "Phrases de guérison",
    "aprende-5-texto":
        "Utiliser des mots qui facilitent les processus d’intégration, de reconnaissance et de transformation au sein du système familial.",

    "aprende-6-titulo": "Thérapie transgénérationnelle",
    "aprende-6-texto":
        "Intégrer des concepts tels que Projet Sens, Loyautés Invisibles, Mémoire Familiale et Cycles Biologiques Mémorisés.",

    "aprende-7-titulo": "Cartes Sagesse en Spirale®",
    "aprende-7-texto":
        "Utiliser des cartes thérapeutiques comme outil complémentaire dans les séances individuelles, autoconstellations et accompagnements.",

    "aprende-8-titulo": "Constellations individuelles dans l’eau ✦",
    "aprende-8-texto":
        "Méthodologie unique pour observer les dynamiques systémiques à travers le mouvement des éléments dans l’eau, élargissant la compréhension du champ et du processus thérapeutique.",

    "aprende-9-titulo": "Actes symboliques et outils",
    "aprende-9-texto":
        "Découvrir différents exercices et outils pour accompagner des processus au-delà de la constellation.",

    "cursos-inclui-titulo": "Ce qui est inclus",

    "inclui-1": "16 modules de formation",
    "inclui-2": "Spécialisation en Constellations individuelles dans l’eau",
    "inclui-3": "Matériel d’étude",
    "inclui-4": "Pratiques supervisées",
    "inclui-5": "Enregistrements des cours",
    "inclui-6": "Groupe d’accompagnement",
    "inclui-7": "Certificat de formation",

    "cursos-invest-titulo": "Investissement",

    "cursos-preco-mensal": "USD 60",
    "cursos-preco-mensal-label": "par mois · 12 versements",

    "cursos-ou": "ou",

    "cursos-preco-total": "USD 690",
    "cursos-preco-total-label": "paiement unique · économisez USD 30",

    "cursos-pagamentos":
        "Moyens de paiement : PayPal, Wise, lien de paiement, Prex, Pix.",

    "cursos-formato-1": "En ligne",
    "cursos-formato-2": "12 mois",
    "cursos-formato-3": "1h30 par semaine",
    "cursos-formato-4": "Cours en direct et enregistrés",
    "cursos-formato-5": "Début 18 août 2026",

    "btn-inscrever-curso": "Je m’inscris",

    "curso2-etiqueta": "Formation spécialisée",
    "curso2-subtitulo": "Constellations familiales dans l’eau",
    "curso2-texto": "Une formation pratique pour les constellateurs et thérapeutes qui souhaitent approfondir leur pratique à travers les constellations dans l’eau, en développant l’écoute systémique, la perception du champ et la sécurité dans la facilitation.",

    "curso2-tag-1": "En ligne · 3 mois",
    "curso2-tag-2": "Cours tous les 15 jours",
    "curso2-tag-3": "Début le 22 août",

    "curso2-btn-ver": "Voir les détails et l’inscription",

    "curso2-aprende-titulo": "Ce que vous allez apprendre",

    "curso2-aprende-1-titulo": "Pratique des constellations",
    "curso2-aprende-1-texto": "Vivre des pratiques de constellation en utilisant l’eau comme outil d’observation et d’approfondissement du champ systémique.",

    "curso2-aprende-2-titulo": "Lecture du mouvement dans l’eau",
    "curso2-aprende-2-texto": "Développer la perception des mouvements et des informations qui émergent à travers les éléments dans le champ de l’eau.",

    "curso2-aprende-3-titulo": "Écoute systémique",
    "curso2-aprende-3-texto": "Approfondir la capacité d’écouter au-delà des mots, en percevant les mouvements et dynamiques du système.",

    "curso2-aprende-4-titulo": "Présence du facilitateur",
    "curso2-aprende-4-texto": "Renforcer la présence, la confiance et la sécurité dans l’accompagnement des processus de constellation.",

    "curso2-aprende-5-titulo": "Intuition et perception",
    "curso2-aprende-5-texto": "Se connecter à la perception intérieure du facilitateur et aux mouvements qui guident le processus.",

    "curso2-aprende-6-titulo": "Lecture du champ",
    "curso2-aprende-6-texto": "Élargir la compréhension du champ systémique et de ses manifestations lors d’une séance.",

    "curso2-aprende-7-titulo": "Différents chemins des constellations",
    "curso2-aprende-7-texto": "Respecter et intégrer différentes expériences et approches au sein des Constellations familiales.",

    "curso2-aprende-8-titulo": "Constellations dans l’eau ✦",
    "curso2-aprende-8-texto": "Explorer une méthodologie pratique utilisant l’eau comme moyen d’observation des mouvements systémiques.",

    "curso2-aprende-9-titulo": "Pratique et intégration",
    "curso2-aprende-9-texto": "Créer un espace d’échange, d’apprentissage partagé et de développement de sa propre manière de faciliter.",

    "curso2-inclui-titulo": "Ce qui est inclus",

    "curso2-inclui-1": "7 rencontres en ligne en direct",
    "curso2-inclui-2": "Durée de 3 mois",
    "curso2-inclui-3": "Cours tous les 15 jours",
    "curso2-inclui-4": "Enregistrement des cours",
    "curso2-inclui-5": "Pratiques supervisées",
    "curso2-inclui-6": "Matériel de support",
    "curso2-inclui-7": "Groupe de suivi",

    "curso2-invest-titulo": "Investissement",

    "curso2-preco-mensal": "USD 70",
    "curso2-preco-mensal-label": "par mois",

    "curso2-ou": "ou",

    "curso2-preco-total": "USD 195",
    "curso2-preco-total-label": "formation complète",

    "curso2-pagamentos": "Modes de paiement : PayPal, Wise, lien de paiement, Prex, Pix.",

    "curso2-formato-1": "En ligne",
    "curso2-formato-2": "3 mois",
    "curso2-formato-3": "Samedis tous les 15 jours",
    "curso2-formato-4": "Cours en direct et enregistrés",
    "curso2-formato-5": "Début le 22 août 2026",

    "curso2-btn-inscrever": "Je veux m’inscrire",

    "inscricao-curso1": "Bonjour Anne, je voudrais m'inscrire au cours de Constellations Familiales avec spécialisation dans l'eau.",
    "inscricao-curso2": "Bonjour Anne, je souhaiterais m'inscrire à la formation spécialisée en Constellations Familiales dans l'Eau.",

    "faq-titulo": "Questions fréquentes",
    "faq-subtitulo":
        "Trouvez les réponses à vos questions avant de commencer votre processus thérapeutique. Si vous ne trouvez pas ce que vous cherchez, contactez-moi directement.",
    "faq1-pergunta":
        "Ai-je besoin d'une orientation médicale pour commencer ?",
    "faq1-resposta":
        "Non. Vous pouvez me contacter directement, sans besoin d’indication médicale ou psychologique. Lors de la première séance, nous discutons de votre situation et définissons ensemble le meilleur chemin. Cependant, pour les constellations familiales, si vous êtes suivi par un psychiatre, il est nécessaire de consulter le professionnel qui vous accompagne afin de vérifier si vous êtes autorisé à le faire.",
    "faq2-pergunta": "Les séances sont-elles en ligne ou en présentiel ?",
    "faq2-resposta":
        "Je propose les deux modalités. Les séances en ligne se déroulent par appel vidéo, avec la même qualité de présence et d'accueil que les séances en présentiel.",
    "faq3-pergunta": "À quelle fréquence dois-je faire les séances ?",
    "faq3-resposta":
        "Chaque processus est unique. Je recommande généralement des rencontres hebdomadaires ou bimensuelles au début, en ajustant la fréquence selon votre évolution et vos besoins.",
    "faq4-pergunta": "Que sont les Constellations Familiales ?",
    "faq4-resposta":
        "C'est une approche qui révèle des dynamiques et des schémas invisibles transmis entre les générations, aidant à comprendre et transformer des conflits qui se répètent dans votre histoire.",
    "faq5-pergunta": "Comment prendre rendez-vous pour ma première séance ?",
    "faq5-resposta":
        "Il suffit de remplir le formulaire ci-dessous ou d'envoyer un message WhatsApp. Je vous répondrai dans les quelques heures pour confirmer le meilleur créneau pour vous.",

    "depo-titulo": "Témoignages",
    "depo-subtitulo":
        "Des histoires réelles de personnes qui ont trouvé un nouveau regard sur elles-mêmes grâce à l'accompagnement thérapeutique.",

    "depo-1-texto":
        "Anne, merci beaucoup. Tu ne sais pas à quel point tu m’aides. Cela fait des années que j’essaie de trouver des réponses comme celles-ci. Aujourd’hui, je souris un peu plus grâce à toi. Je vais le mettre en pratique ces jours-ci.",
    "depo-1-nome": "Dante",
    "depo-1-cargo": "2025",

    "depo-2-texto":
        "Chère Anne, je voulais te remercier pour la chaleur que tu as partagée tout au long du cours, pour avoir partagé tes connaissances avec nous et pour ton soutien constant. Merci infiniment pour tout.",
    "depo-2-nome": "Angie",
    "depo-2-cargo": "2025",

    "depo-3-texto":
        "Un workshop incroyable ! Beaucoup de changements de perspective, d’apprentissages et de nouveaux regards. C’était exactement ce dont j’avais besoin pour me retrouver. Un chemin de connaissance de soi. Gratitude Anne, j’ai adoré participer.",
    "depo-3-nome": "Helen",
    "depo-3-cargo": "2025",

    "depo-4-texto":
        "Honnêtement, c’est la meilleure chose qui me soit arrivée cette année. Chaque thème abordé se reflétait dans la réalité, c’était incroyable de voir comment tout était connecté. Le processus de guérison que je traverse est merveilleux. J’ai retrouvé une relation différente avec mes parents. Je recommande totalement car cela m’a beaucoup aidée. J’ai pris conscience de beaucoup de choses que je ne savais pas. Et la manière dont tu guides, Anne, est très belle et pleine d’amour, tout se déroule naturellement. Gratitude du fond du cœur.",
    "depo-4-nome": "Catalina",
    "depo-4-cargo": "2025",

    "depo-5-texto":
        "Je voulais dire que nos rencontres me manquent beaucoup ! C’était très beau de partager cette année avec vous, même virtuellement. Le workshop m’a montré que, même si le développement personnel est un processus individuel, il devient plus léger accompagné. Merci Anne et Helen de m’avoir accompagnée dans ce parcours. Je vous souhaite de belles célébrations et une belle fin d’année.",
    "depo-5-nome": "Paula",
    "depo-5-cargo": "2025",

    "depo-6-texto":
        "Bonjour Anne ! La situation de mon amie que j’ai abordée lors de la dernière constellation s’est débloquée le jour même et le lendemain. Incroyable.",
    "depo-6-nome": "Carol",
    "depo-6-cargo": "2026",

    "agenda-titulo": "Prendre rendez-vous",
    "agenda-subtitulo":
        "Choisissez le jour et l'heure qui correspondent le mieux à votre emploi du temps.",
    "label-servico": "Service",
    "opt-servico-placeholder": "Sélectionnez un service",
    "opt-servico-5": "Séance d'Évaluation",
    "opt-servico-6": "Cours",
    "label-data": "Date",
    "label-horario": "Horaire",
    "opt-horario-placeholder": "Sélectionnez un horaire",
    "opt-horario-1": "Matin (9h–12h)",
    "opt-horario-2": "Après-midi (14h–17h)",
    "opt-horario-3": "Soir (18h–20h)",
    "btn-agendar-agora": "Réserver maintenant",
    "msg-agendamento-sucesso":
        "Nous avons reçu votre demande ! Nous vous contacterons bientôt pour confirmer le créneau.",
    "msg-agendamento-erro":
        "Veuillez remplir tous les champs avant de continuer.",

    "rodape-tagline":
        "Accompagnement thérapeutique pour votre transformation et croissance personnelle.",
    "rodape-col-navegacao": "Navigation",
    "rodape-col-terapias": "Thérapies",
    "rodape-col-newsletter": "Newsletter",
    "rodape-newsletter-texto":
        "Recevez des réflexions, des nouveautés sur les cours et des contenus exclusifs directement dans votre boîte mail.",
    "placeholder-email": "Votre e-mail",
    "btn-inscrever": "S'inscrire",
    "rodape-privacidade": "Politique de Confidentialité",
    "rodape-termos": "Conditions Générales",
    "rodape-copyright": "© 2026 Espiral de Sabedoria. Tous droits réservés.",
    "msg-newsletter-sucesso":
        "Inscription réussie ! Vous recevrez bientôt nos nouveautés.",
    },
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

// ===============================
//  WhatsApp base config
// ===============================
const numero = "555196704735";

const buildWhatsAppLink = (numero, mensagem) => {
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
};

// ===============================
// FORM AGENDAMENTO
// ===============================
const formAgendamento = document.querySelector('[data-form="agendamento"]');
const campoData = document.getElementById("campo-data");

// Impede datas passadas
if (campoData) {
    const hoje = new Date();
    const min = hoje.toISOString().split("T")[0];
    campoData.setAttribute("min", min);
}

if (formAgendamento) {
    const msgErro = document.getElementById("agendamento-erro");

    formAgendamento.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!formAgendamento.checkValidity()) {
        msgErro?.classList.add("is-visivel");
        return;
    }

    msgErro?.classList.remove("is-visivel");

    const servico = document.querySelector(
        "#campo-servico option:checked",
    ).textContent;
    const data = document.getElementById("campo-data").value;
    const horario = document.getElementById("campo-horario").value;

    const [aaaa, mm, dd] = data.split("-");
    const dataFormatada = `${dd}/${mm}/${aaaa}`;

    const msg = `Olá! Gostaria de agendar uma sessão.\n\n• Serviço: ${servico}\n• Data: ${dataFormatada}\n• Horário: ${horario}`;

    window.open(
        buildWhatsAppLink(numero, msg),
        "_blank",
        "noopener,noreferrer",
    );

    formAgendamento.reset();

    if (campoData) {
        campoData.setAttribute("min", new Date().toISOString().split("T")[0]);
    }
    });
}

// ===============================
// BOTÕES WHATSAPP (i18n)
// ===============================
document.querySelectorAll("[data-wa-key]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
    e.preventDefault();

    const key = btn.getAttribute("data-wa-key");

    const msg =
        dicionario?.[idiomaAtual]?.[key] ||
        dicionario?.pt?.[key] ||
        dicionario?.pt?.default;

    window.open(
        buildWhatsAppLink(numero, msg),
        "_blank",
        "noopener,noreferrer",
    );
    });
});
})();
