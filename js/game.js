const gameName = 'K*SMV5 2126';
const bonusScene = ``;

const imageElement = document.getElementById('img');
const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {};

function startGame() {
  state = {};
  showTextNode(0);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerHTML = textNode.text;
  if (textNodeIndex === 22) {
    textElement.style.visibility = "hidden";
    document.body.style.backgroundImage = "url('./img/bg.jpg')";
  } else {
    textElement.style.visibility = "visible";
  }
  imageElement.innerHTML = textNode.img;
  if (textNodeIndex === 22) {
    imageElement.style.visibility = "hidden";
  } else {
    imageElement.style.visibility = "visible";
  }
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }
  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerHTML = option.text;
      button.classList.add('btn');
      button.addEventListener('click', () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

const textNodes = [
  // HOME
  {
    id: 0,
    text:
      `<div class="title">
      <h1 class="main-title anim-txt">${gameName}</h1>
      <h3 class="subtitle">Medo e delírio no Limiar da Galáxia</h3>
      <br>
      <p class="line animate__animated animate__slideInUp animate__faster">Criado por Daniel Hogrefe & Jonas Dalacorte</p>
    </div>`,
    img:
      '<img class="img" src="./img/bg.jpeg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text: '<strong>Jogar ✨</strong>',
        nextText: 1,
      },
      {
        text: 'Créditos 👁‍🗨',
        nextText: 24,
      },
    ],
  },

  // CREDITS
  {
    id: 24,
    text:
      `<div class="title">
      <h1 class="credits-title animate__animated animate__lightSpeedInRight animate__fast">${gameName}</h1>
    </div>
  <div class="credits">
    <h4 class="credits-title">Criação</h4>
    <p>Daniel Hogrefe & Jonas Dalacorte</p>
    <h4 class="credits-title">Arte Original</h4>
    <p><a class="links" href="https://danielhogrefe.tumblr.com/" target="_blank">Daniel Hogrefe</a></p>
    <h4 class="credits-title">Programação & Design</h4>
    <p><a class="links" href="https://github.com/dpsmkr/" target="_blank">Jonas Dalacorte</a></p>
    <h4 class="credits-title">Trilha Original</h4>
    <p><a class="links" href="#">AKAAO</a></p>
    <br>
    <h4 class="credits-title">Recursos:</h4>
    <p class="line"><a class="links" href="https://github.com/WebDevSimplified" target="_blank">Web Dev Simplified</a></p>
    <p class="line"><a class="links" href="https://animate.style/" target="_blank">Animate.css</a></p>
  </div >`,
    img: '',
    options: [
      {
        text: 'Voltar',
        nextText: 0,
      },
    ],
  },

  // SCENE 1
  {
    id: 1,
    text: `<p class="txt animate__animated animate__fadeIn">Você acorda no chão imundo de uma das cabines no banheiro do <span class="var">Mondrian's</span>, um bar de fim de noite no Limiar da Galáxia. Os únicos resquícios da noite passada são o vômito nas suas calças, uma dor de cabeça infernal e um frasco cheio até a metade com um <span class="var">Líquido Roxo</span> que parece remédio para dor de barriga no seu bolso esquerdo.<span class="cursor-blink">|</span></p>`,
    img: '<img class="img" src="./img/bg.jpeg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text: '<strong>Sair</strong> do banheiro',
        nextText: 3,
      },
      {
        text: 'Investigar as <strong>outras cabines</strong>',
        nextText: 2,
      },
    ],
  },

  // SCENE 2
  {
    id: 2,
    text: `<p class="txt animate__animated animate__fadeIn">Além de um maço de cigarros úmidos e um rato espacial em decomposição, nada de útil na cabine da direita. Na cabine à sua esquerda você encontra uma prescrição médica rasgada pela metade. É possível ler apenas "<span class="var">Dra. Y.Suzuki</span>" e o código "<span class="var">K*SMV5</span>" &mdash; essa mesma sequência está anotada no frasco do Líquido Roxo.<span class="cursor-blink">|</span></p>`,
    img: '<img class="img" src="./img/ph.jpg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text: '<strong>Sair</strong> do banheiro',
        setState: { clue1: true },
        nextText: 3,
      },
      {
        text: 'Experimentar o <strong>Líquido Roxo</strong>',
        nextText: 21,
      },
    ],
  },

  // SCENE 3
  {
    id: 3,
    text: `<p class="txt animate__animated animate__fadeIn">Por baixo da porta de entrada você vê os primeiros raios do <span class="var">Sol #2</span> invadindo o ambiente, indicando que você já perdeu metade do dia. No balcão, o Velho Barman te ignora enquanto enrola um de seus cigarros fedorentos e assiste a um noticiário qualquer falando sobre a <span class="var">Guerra Iminente</span>.<span class="cursor-blink">|</span></p>`,
    img: '<img class="img" src="./img/ph.jpg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text: 'Perguntar sobre a <strong>noite passada</strong>',
        nextText: 6,
      },
      {
        text: 'Perguntar o que ele sabe sobre A Substância <strong>K*SMV5</strong>',
        nextText: 4,
        requiredState: (currentState) => currentState.clue1,
      },
      {
        text: '<strong>Sair</strong> do bar',
        nextText: 7,
      },
    ],
  },

  // SCENE 4 (transition)
  {
    id: 4,
    text: `<p class="txt animate__animated animate__fadeIn">Uma das vantagens de ser Local no Mondrian's é que você sabe que antes de passar suas horas resmungando atrás do balcão empoeirado, o Velho Barman também praticou <span class="var">Trambiques Espaciais</span>. Talvez ele possa ajudar a desvendar esse pequeno mistério ressaquento.<span class="cursor-blink">|</sspan></p>`,
    img: '<img class="img" src="./img/ph.jpg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text: '<strong>>>></strong>',
        nextText: 5,
      },
    ],
  },

  // SCENE 5
  {
    id: 5,
    text: `<p class="txt animate__animated animate__fadeIn">O Velho Barman explica que A Substância <span class="var">K*SMV5</span> não é produzida há mais de 300 anos, antes dos rumores sobre A Guerra Iminente, e que provavelmente esse frasco veio parar nesse exato buraco no Limiar da Galáxia por meio de Contrabando Sônico &mdash; uma espécie de Viagem no Tempo. Suas propriedades são desconhecidas já que sua principal pesquisadora, a <span class="var">Dra. Y.Suzuki</span>, desapareceu logo após a descoberta. Ele muda de feição repentinamente e pede para ver A Substância mais de perto, as luzes do bar começam a piscar bizarramente.<span class="cursor-blink">|</strong></p>`,
    img: '<img class="img" src="./img/ph.jpg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text: '<strong>"Sem chance!"</strong>, é hora de dar o fora',
        nextText: 7,
      },
      {
        text: 'Entregar <strong>A Substância</strong> ao Velho Kroptiliano',
        nextText: 22,
      },
      {
        text: 'Perguntar sobre a <strong>Dra. Y.Suzuki</strong>',
        nextText: 6,
      },
    ],
  },

  // SCENE 6
  {
    id: 6,
    text: `<p class="txt animate__animated animate__fadeIn">O Velho Barman ignora sua pergunta e fixa o olhar no frasco d'<span class="var">A Substância</span>. Um sentimento esmagador toma conta de seu peito. É hora de dar o fora.<span class="cursor-blink">|</strong></p>`,
    img: '<img class="img" src="./img/ph.jpg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text: '<strong>>>></strong>',
        nextText: 7,
      },
    ],
  },

  // SCENE 7 (vehicle)
  {
    id: 7,
    text: `<p class="txt animate__animated animate__fadeIn">Sem seus óculos anti-UV você leva alguns segundos para conseguir adaptar a visão ao dia ofuscante do Planeta Kroptil. Você encontra sua <span class="var">Turbo 4-BK20</span> estacionada há alguns metros do Bar. A chave não está no seu bolso... ainda está na ignição. Aparentemente a noite passada começou mais cedo do que você lembra.<span class="cursor-blink">|</strong></p>`,
    img: '<img class="img" src="./img/ph.jpg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text: 'Procurar algo para <strong>quebrar o bio-vidro</strong> da Turbo 4-BK20',
        setState: { spaceShip: true },
        nextText: 8,
      },
      {
        text:
          '<strong>"Que diabos de dia"</strong>, experimentar A Substância',
        nextText: 21,
      },
      {
        text:
          'Chamar um <strong>Táxi Espacial</strong> e curar a ressaca em casa',
        setState: { taxi: true },
        nextText: 10,
      },
    ],
  },
  // no return

  // SCENE 8 (message igore / read)
  {
    id: 8,
    text: `<p class="txt animate__animated animate__fadeIn">O bio-vidro se espatifa em milhares de pedaços reluzentes com o impacto. Antes que o alarme soe e o plasma temporário seja ativado, você salta para dentro e gira a chave na ignição, o motor neo-nuclear ruge e a Turbo 4-BK20 está pronta para um <span class="var">Salto Sônico</span>. O ícone de mensagem recebida no monitor chama sua atenção.<span class="cursor-blink">|</strong></p>`,
    img: '<img class="img" src="./img/ph.jpg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text: '<strong>Checar</strong> a mensagem',
        setState: { readMessage: true },
        nextText: 9,
      },
      {
        text:
          '<strong>Ignorar</strong> a mensagem e ir direto para casa',
        setState: { taxi: true },
        nextText: 10,
      },
    ],
  },
  // no return

  // SCENE 9 (message)
  {
    id: 9,
    text: `<p class="txt animate__animated animate__fadeIn">O rosto que aparece no telecomunicador é e não é familiar. Uma espécie de <em>déjà vu</em> estranho. Você ouve atentamente a mensagem: Uma sombra que se identifica como sendo a <span class="var">Dra. Y.Suzuki</span> avisa com tom sinistro que você &mdash; seja lá quem for que estiver em posse d'A Substância &mdash; corre perigo e que Forças Obscuras estão atrás d'A Substância que pode alterar o curso da vida na Galáxia. Ela pede para que você salte imediatamente para <span class="var">Kluster-89</span> e mostra as coordenadas.<span class="cursor-blink">|</strong></p>`,
    img: '<img class="img" src="./img/ph.jpg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text:
          '<strong>Ignorar</strong> as instruções e ir para casa curar a ressaca',
        nextText: 10,
        requiredState: (currentState) => currentState.readMessage,
      },
      {
        text: `Seguir as instruções e saltar para <strong>Kluster-89</strong>`,
        nextText: 12,
      },
      {
        text: `Pesquisar o código e o nome da Dra. Y.Suzuki na <strong>Rede de Computadores</strong>`,
        nextText: 11,
      },
    ],
  },

  // SCENE 10 (casa)
  {
    id: 10,
    text:
      `<p class="txt animate__animated animate__fadeIn">Ao chegar no seu cubículo flutuante você se depara com a <span class="var">porta pulverizada e seus objetos espalhados por todos os lados</span>. Alguém ou algo está na sua cola e você não faz ideia do que está acontecendo.<span class="cursor-blink">|</strong></p>`,
    img: '<img class="img" src="./img/ph.jpg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text: 'Seguir as instruções da Dra. e saltar para <strong>Kluster-89</strong>',
        requiredState: (currentState) => currentState.readMessage,
        nextText: 12,
      },
      {
        text: 'Experimentar a maldita <strong>Substância</strong>',
        nextText: 21,
      },
      {
        text: 'Checar sua <strong>caixa de mensagens</strong>',
        requiredState: (currentState) => currentState.taxi,
        setState: { readMessage: false },
        nextText: 9,
      },
    ],
  },

  // SCENE 11 (search)
  {
    id: 11,
    text: `<p class="txt animate__animated animate__fadeIn">Há cerca de 350 anos a Dra. Youko Suzuki integrou um grupo de pesquisas na <span class="var">Universidade Monolítica da Galáxia</span>. O objeto de estudo era o funcionamento do cérebro das espécies conhecidas da Galáxia e sua percepção da realidade. A Dra. Suzuki publicou em seu diário virtual que havia feito uma descoberta inimaginável com potencial para alterar o curso da história do Universo. No dia do anúncio oficial, no entanto, o laboratório explodiu misteriosamente. Nenhum corpo foi encontrado, e os registros da pesquisa que não se perderam na explosão foram destruídos pelas forças policiais. Desde então frascos com A Substância descoberta são encontrados em determinados períodos no tempo e em locais improváveis do Universo.<span class="cursor-blink">|</strong></p>`,
    img: '<img class="img" src="./img/ph.jpg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text: 'Saltar para <strong>Kluster-89</strong>',
        nextText: 12,
      },
      {
        text: '<strong>Misturar</strong> A Substância com seu fumo Kroptiliano',
        nextText: 22,
      }
    ],
  },

  // SCENE 12 (transition)
  {
    id: 12,
    text: `<p class="txt animate__animated animate__fadeIn">Com a ressaca de uma noite no Mondrian's e o cansaço de não saber onde se meteu você decide que é hora de descobrir o que está acontecendo. O <span class="var">bio-vidro</span> da Turbo 4-BK20 completou seu autorreparo e está pronta para um Salto Sônico mais longo.<span class="cursor-blink">|</strong></p>`,
    img: '<img class="img" src="./img/ph.jpg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text: '<strong>>>></strong>',
        nextText: 13,
      },
    ],
  },

  // SCENE 13
  {
    id: 13,
    text: `<p class="txt animate__animated animate__fadeIn">Após alguns anos luz de distância serem comprimidos em míseros segundos de existência você chega em <span class="var">Kluster-89</span>, ou o que sobrou dele. Ainda com a náusea causada pelo salto, você se encontra no meio do que parece ter sido uma praça, agora tomada pela densa selva tropical que cobre o planeta. Enormes prédios verdes por todos os lados. De algum ponto no centro da praça emana uma <span class="var">Névoa Roxa</span>, com a mesma tonalidade d'A Substância no frasco. À sua esquerda, de frente para o centro da praça, um Bar em pleno funcionamento.<span class="cursor-blink">|</strong></p>`,
    img: '<img class="img" src="./img/ph.jpg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text: 'Investigar o <strong>Bar</strong>',
        nextText: 15,
      },
      {
        text: 'Investigar a <strong>Névoa</strong>',
        setState: { bar2: true },
        nextText: 16,
      },
      {
        text: 'Acender um bom e velho <strong>cigarro Kroptiliano</strong> para curar o enjôo',
        nextText: 14,
      },
    ],
  },

  // SCENE 14
  {
    id: 14,
    text: `<p class="txt animate__animated animate__fadeIn">Você se encosta na Turbo 4-BK20 e começa a enrolar seu cigarro Kroptiliano enquanto observa o movimento de <em>entra-e-sai</em> no Bar envolto em <span class="var">Névoa Púrpura</span>. Impressionante como algumas formas de socialização permanecem e sobrevivem até mesmo após a queda total da civilização e a ameaça de uma Guerra Iminente por toda a Galáxia. O enjôo desaparece como mágica depois de duas tragadas.<span class="cursor-blink">|</strong></p>`,
    img: '<img class="img" src="./img/ph.jpg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text: 'Investigar o <strong>Bar</strong>',
        nextText: 15,
      },
      {
        text: 'Investigar a <strong>Névoa</strong>',
        setState: { bar2: true },
        nextText: 16,
      },
    ],
  },

  // SCENE 15
  {
    id: 15,
    text: `<p class="txt animate__animated animate__fadeIn">A mesma cena em todos os cantos do Universo Conhecido, do Centro Cósmico ao Limiar da Galáxia: O Bar de Fim de Noite. Como numa cena de algum <em>spaghetti western futurista</em>, alienígenas e humanos fedorentos se aglomeram no balcão e em volta das mesas bebendo em taças e canecas um líquido que se parece com <span class="var">A Substância</span>. Sua entrada no bar é totalmente ignorada. Além da densa fumaça de cigarros, um tom arroxeado no ar chama sua a atenção pela semelhança com a cor d'A Substância.<span class="cursor-blink">|</strong></p>`,
    img: '<img class="img" src="./img/ph.jpg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text: 'Perguntar ao Barman sobre a <strong>Névoa Roxa</strong>',
        nextText: 17,
      },
      {
        text: 'Pedir uma dose da <strong>Bebida</strong>',
        nextText: 21,
      },
      {
        text:
          '<strong>"Dane-se esse lugar"</strong>, seguir em direção à Névoa',
        setState: { bar2: true },
        nextText: 16,
      },
    ],
  },

  // SCENE 16
  {
    id: 16,
    text:
      '<p class="txt animate__animated animate__fadeIn">Se embrenhando por entre os galhos que parecem tentáculos de centenas de anos você consegue chegar numa parte mais elevada perto do centro da praça. Adiante, de um buraco na terra, um vapor denso e Roxo é expelido como em um geiser. Uma <span class="var">Figura Enigmática</span> pode ser vista através do vapor. Aparentemente sua movimentação é imperceptível.<span class="cursor-blink">|</strong></p>',
    img: '<img class="img" src="./img/ph.jpg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text:
          'Esconder-se e <strong>observar</strong> a Figura Enigmática secretamente',
        nextText: 18,
      },
      {
        text:
          '<strong>Voltar ao Bar</strong> e tentar conseguir mais informações sobre o local',
        requiredState: (currentState) => currentState.bar2,
        nextText: 17,
      },
      {
        text:
          '<strong>Atacar</strong> a Figura Enigmática aproveitando-se do fator surpresa',
        nextText: 19,
      },
    ],
  },

  // SCENE 17
  {
    id: 17,
    text: '<p class="txt animate__animated animate__fadeIn">O Barman, que parece uma versão alienígena do Velho Barman fica visivelmente desconfortável com a pergunta: <span class="var">"Eu não sei de nada! É melhor você dar o fora e cuidar da sua VIDA!"</span><span class="cursor-blink">|</strong></p>',
    img: '<img class="img" src="./img/ph.jpg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text: 'Investigar a <strong>Névoa</strong>',
        setState: { bar2: false },
        nextText: 16,
      },
      {
        text: 'Pedir uma dose da <strong>Bebida</strong> mesmo assim',
        nextText: 22,
      },
    ],
  },

  // SCENE 18 (transition)
  {
    id: 18,
    text: '<p class="txt animate__animated animate__fadeIn">Se esgueirando por entre os escombros cheios de limo da antiga praça você tenta uma aproximação. A Figura Enigmática tem algo em suas mãos &mdash; um frasco igual ao seu. Investigando com mais atenção você percebe se tratar da <span class="var">Dra. Y.Suzuki</span>. Ela percebe sua presença.<span class="cursor-blink">|</strong></p>',
    img: '<img class="img" src="./img/ph.jpg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text: '<strong>>>></strong>',
        nextText: 19,
      },
    ],
  },

  // SCENE 19
  {
    id: 19,
    text: `<p class="txt animate__animated animate__fadeIn">A Dr. Y.Suzuki chega até você num caminhar flutuante. Suas pupilas estão totalmente dilatadas, os olhos são como duas azeitonas inchadas: "É tudo uma simples simulação. Nós conseguimos quebrar o Universo. Descobrimos o caminho pra Fora. Eu tenho percorrido o Tempo tentando encontrar um jeito de reunir minhas descobertas. A <span class="var">K*SMV5</span> que você trouxe até mim é um extrato de <span class="var"><em>Lophophora williamsii</em></span>. Ele dissolve as amarras do programa. Libertando a mente. Mas é fatal. Eles não querem que isso seja do conhecimento de ninguém que julguem perigosos ou revolucionários aos olhos do Pseudo-Império. Desde os primeiros rumores sobre a Guerra Iminente, há 300 anos, todas as informações sobre As Substâncias têm sido apagadas da história.”. A Doutora mostra o frasco que ela tem em mãos e você percebe que a Substância tem uma cor levemente diferente. "Essa é minha outra descoberta: <span class="var">A Substância G4-NJ4</span> age no organismo limitando o efeito da Explosão Sônica causada pela K*SMV5. As duas devem ser usadas juntas em doses exatamente iguais." Ela mistura as duas Substâncias e oferece uma dose a você.<span class="cursor-blink">|</strong></p>`,
    img: '<img class="img" src="./img/ph.jpg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text: '<strong>Aceitar</strong> a dose',
        nextText: 20,
      },
      {
        text: '<strong>Recusar</strong> a dose',
        nextText: 22,
      },
    ],
  },

  // GOOD
  {
    id: 20,
    text: `<p class="animate__animated animate__fadeIn fim">No exato instante em que a mistura d'As Substâncias toca sua língua o verde que encobre a praça começa a derreter em pequenas <span class="var">partículas geométricas</span> e todo o vapor Roxo que era expelido pelos geisers se mistura com sua carne, agora exposta, do avesso, assim como a Dra Y.Suzuki. Você não sente dor, nem medo. Um flash branco te cega por alguns segundos. Aos poucos você consegue observar a fachada do Mondrian's. Você está sentado dentro do Turbo 4-BK20 e pelo retrovisor vê o Segundo Sol se pondo. <em>Isso aconteceu ou foi um sonho embriagado?</em> No seu colo um pedaço de papel quase transparente com as iniciais <span class="var">Y. S.</span> e uma única frase: <p class="var end-txt">"É tudo real"<span class="cursor-blink">|</strong></p></p>`,
    img: '<img class="img" src="./img/ph.jpg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text: '<strong>💊 FIM 💊</strong>',
        nextText: 23,
      },
    ],
  },

  // NEUTRAL
  {
    id: 21,
    text: `<p class="var end-txt">Game Over</p><p class="animate__animated animate__fadeIn">Você começa a ver cores que não existem e sente como se seu corpo não estivesse conectado com seus órgãos. A Galáxia é Você e Você é a Galáxia. <p class="var end-txt">Nada é verdadeiro, tudo é permitido.<span class="cursor-blink">|</strong></p></p>`,
    img: '<img class="img" src="./img/ph.jpg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text: '<strong>🌟 Recomeçar 🌟</strong>',
        nextText: 1,
      },
    ],
  },

  // BAD
  {
    id: 22,
  },

  // BONUS
  {
    id: 23,
    text: `<div class="bonus"><p class="var anim-txt end-txt">Obrigado por jogar!</p><p class="animate__animated animate__fadeIn">Você pode fazer o <span class="var">download grátis</span> do mini-álbum completo com a trilha sonora composta especialmente para o jogo aqui: <a class="links" href="#" target="_blank">** LINK PRO BANDCAMP WHATEVER **</a> .</p><p class="animate__animated animate__fadeIn">Essa pequena aventura espacial foi idealizada por Jonas Dalacorte e Daniel Hogrefe no segundo semestre de 2020 em Porto Alegre, RS.</p><p class="animate__animated animate__fadeIn">É uma espécie de homenagem ou indicação simplória aos temas clássicos de ficção científica que gostamos e temos como influência estética.</p><p class="animate__animated animate__fadeIn">Se você quiser conversar sobre qualquer tema relacionado (ou não) ao jogo, faça contato por: <a class="links" href="email@yonsounds.com" target="_blank">email@yonsounds.com</a></p></div>`,
    img: '<img class="img" src="./img/ph.jpg" alt="copyright Daniel Hogrefe" />',
    options: [
      {
        text: 'Voltar 👾',
        nextText: -1,
      },
    ],
  },
];

startGame();
