const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');
const imageElement = document.getElementById('img');

let state = {};

function startGame() {
  state = {};
  showTextNode(0);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerHTML = textNode.text;
  imageElement.innerHTML = textNode.img;
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

// story
const textNodes = [
  // scene start - HOME
  {
    id: 0,
    text:
      '<div class="title"><h1>Space Muamba 2053</h1><p>Criado por Jonas Dalacorte & Daniel Hogrefe</p></div>',
    img:
      '<img class="img" src="https://i.imgur.com/PEPcYaw.gif" alt="test-img" />',
    options: [
      {
        text: 'Começar',
        nextText: 1,
      },
      {
        text: 'Créditos',
        nextText: 420,
      },
    ],
  },
  // scene end

  // scene start -
  {
    id: 420,
    text:
      '<h1>Space Muamba 2053</h1><p class="credits">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem quod, voluptate inventore fuga id sequi nulla eum neque voluptas, incidunt praesentium enim, unde dolore rem suscipit! Vero obcaecati enim earum alias minima adipisci ipsam facere, suscipit nulla numquam iste ab, nesciunt quasi sunt! Doloremque quaerat alias inventore sit omnis sed!</p>',
    img: '',
    options: [
      {
        text: 'Voltar',
        nextText: 0,
      },
    ],
  },
  // scene end

  {
    id: 1,
    text:
      'Você acorda no banheiro de um bar de fim de noite no limiar da Galáxia sem nenhum pertence. Apenas um frasco cheio até a metade com um <span class="highlight">Pó Roxo</span> ao lado da latrina.',
    img:
      '<img class="img" src="https://media1.giphy.com/media/QrJSFW6R6wqKQ/giphy.gif" alt="test-img" />',
    options: [
      {
        text: 'Pegar o frasco e sair do banheiro',
        setState: { pohRoxo: true },
        nextText: 2,
      },
      {
        text: 'Ignorar o frasco e sair do banheiro',
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    text:
      'No salão do bar você encontra o Alienígena Dono do Bar. Ele resmunga sobre a sua demora no banheiro e segue seus afazeres.',
    img:
      '<img class="img" src="https://media1.giphy.com/media/54u9PXmw1zU8U/giphy.gif" alt="test-img" />',
    options: [
      {
        text: 'Perguntar ao Alienígena Dono do Bar sobre o Pó Roxo',
        requiredState: (currentState) => currentState.pohRoxo,
        nextText: 3,
      },
      {
        text: 'Perguntar o que aconteceu na noite passada',
        nextText: 4,
      },
      {
        text: 'Sair do bar',
        nextText: 5,
      },
    ],
  },
  {
    id: 3,
    text:
      'Ele responde que não se envolve em "papo de mercador" e segue seus afazeres atrás do balcão.',
    img:
      '<img class="img" src="https://media1.giphy.com/media/lrkdJMmrV4SiY/giphy.gif" alt="test-img" />',
    options: [
      {
        text: 'Perguntar sobre a noite passada',
        nextText: 4,
      },
      {
        text: 'Sair do bar',
        nextText: 5,
      },
    ],
  },
  {
    id: 4,
    text:
      'O Alienígena Dono do Bar fica possesso e manda você sair logo do seu bar.',
    img:
      '<img class="img" src="https://media2.giphy.com/media/yYU1SgRpBBcDm/giphy.gif" alt="test-img" />',
    options: [
      {
        text: 'Sair do bar',
        nextText: 5,
      },
    ],
  },
  {
    id: 5,
    text:
      'Quando você sai pela porta do bar se dá conta de que é tudo um sonho.',
    img:
      '<img class="img" src="https://media0.giphy.com/media/74mQxYVTXSQAo/giphy.gif" alt="test-img" />',
    options: [
      {
        text: 'FIM',
        nextText: -1,
      },
    ],
  },
];

startGame();
