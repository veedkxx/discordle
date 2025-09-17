// Base de dados de integrantes
const champions = [
    {
        name: "Bonnie",
        gender: "Feminino",
        idade: "26",
        estado: "Washington",
        banido: "Sim",
        origem: "OCT",
        image: "bonnie.png"
    },
    {
        name: "Lisa",
        gender: "Feminino",
        idade: "19",
        estado: "São Paulo",
        banido: "Não",
        origem: "OCT",
        image: "lisa.png"
    },
    {
        name: "Turini",
        gender: "Masculino",
        idade: "21",
        estado: "São Paulo",
        banido: "Sim",
        origem: "Brasil",
        image: "turini.png"
    },
    {
        name: "Dole",
        gender: "Masculino",
        idade: "20",
        estado: "São Paulo",
        banido: "Não",
        origem: "OCT",
        image: "dole.png"
    },
    {
        name: "Izuuh",
        gender: "Masculino",
        idade: "22",
        estado: "São Paulo",
        banido: "Não",
        origem: "Desconhecido",
        image: "izuuh.png"
    },
    {
        name: "Silver",
        gender: "Masculino",
        idade: "24",
        estado: "São Paulo",
        banido: "Sim",
        origem: "Brasil",
        image: "silver.png"
    },
    {
        name: "Tortuguito",
        gender: "Masculino",
        idade: "24",
        estado: "São Paulo",
        banido: "Não",
        origem: "Brasil",
        image: "tortuguito.png"
    },
    {
        name: "Cerjo",
        gender: "Masculino",
        idade: "21",
        estado: "Rio de Janeiro",
        banido: "Não",
        origem: "OCT",
        image: "cerjo.png"
    },
    {
        name: "Piropiko",
        gender: "Masculino",
        idade: "22",
        estado: "Rio Grande do Sul",
        banido: "Não",
        origem: "Brasil",
        image: "piropiko.png"
    },
    {
        name: "Ricardo",
        gender: "Masculino",
        idade: "23",
        estado: "Rio Grande do Sul",
        banido: "Sim",
        origem: "Brasil",
        image: "ricardo.png"
    },
    {
        name: "Edvan",
        gender: "Masculino",
        idade: "24",
        estado: "Espírito Santo",
        banido: "Não",
        origem: "Barzinho",
        image: "edvan.png"
    },
    {
        name: "Yan",
        gender: "Masculino",
        idade: "23",
        estado: "São Paulo",
        banido: "Não",
        origem: "Brasil",
        image: "yan.png"
    },
    {
        name: "Chad",
        gender: "Masculino",
        idade: "24",
        estado: "Paraná",
        banido: "Sim",
        origem: "Brasil",
        image: "chad.png"
    },
    {
        name: "Daniel",
        gender: "Masculino",
        idade: "24",
        estado: "Minas Gerais",
        banido: "Sim",
        origem: "Aerópago",
        image: "daniel.png"
    },
    {
        name: "Texugo",
        gender: "Masculino",
        idade: "21",
        estado: "Minas Gerais",
        banido: "Sim",
        origem: "OCT",
        image: "texugo.png"
    },
    {
        name: "Chihiro",
        gender: "Feminino",
        idade: "24",
        estado: "São Paulo",
        banido: "Sim",
        origem: "Brasil",
        image: "chihiro.png"
    },
    {
        name: "Savin",
        gender: "Masculino",
        idade: "22",
        estado: "Rio de Janeiro",
        banido: "Não",
        origem: "OCT",
        image: "savin.png"
    },
    {
        name: "Zyero",
        gender: "Masculino",
        idade: "23",
        estado: "Paraná",
        banido: "Não",
        origem: "Brasil",
        image: "zyero.png"
    },
    {
        name: "Veed",
        gender: "Masculino",
        idade: "20",
        estado: "Amapá",
        banido: "Sim",
        origem: "OCT",
        image: "veed.png"
    }
];

        // Variáveis do jogo
        let targetChampion;
        let attempts = 0;
        const maxAttempts = 8;
        let gameOver = false;
        
        // Elementos do DOM
        const championInput = document.getElementById('champion-input');
        const submitGuess = document.getElementById('submit-guess');
        const guessesContainer = document.getElementById('guesses');
        const attemptsCounter = document.getElementById('attempts-counter');
        const resultMessage = document.getElementById('result-message');
        const newGameBtn = document.getElementById('new-game-btn');
        const currentHint = document.getElementById('current-hint');
        
        // Inicializar o jogo
        function initGame() {
            // Selecionar um integrante aleatório
            targetChampion = champions[Math.floor(Math.random() * champions.length)];
            console.log(targetChampion);
            
            attempts = 0;
            gameOver = false;
            guessesContainer.innerHTML = '';
            attemptsCounter.textContent = `Tentativas: ${attempts}/${maxAttempts}`;
            resultMessage.style.display = 'none';
            newGameBtn.style.display = 'none';
            championInput.disabled = false;
            submitGuess.disabled = false;
            championInput.focus();
            
            // Atualizar a dica
            currentHint.textContent = targetChampion.hint;
            console.log(targetChampion);
        }
        
        // Verificar o palpite
        function checkGuess() {
            if (gameOver) return;
            
            const guess = championInput.value.trim();
            if (!guess) return;
            
            // Verificar se o palpite é válido
            const guessedChampion = champions.find(champ => 
                champ.name.toLowerCase() === guess.toLowerCase()
            );
            
            if (!guessedChampion) {
                alert("Integrante não reconhecido. Tente outro nome.");
                championInput.value = '';
                return;
            }
            
            attempts++;
            attemptsCounter.textContent = `Tentativas: ${attempts}/${maxAttempts}`;
            
            // Criar linha de palpite
            const guessRow = document.createElement('div');
            guessRow.className = 'guess-row';
            
            // Adicionar células com os dados do palpite
            addGuessCell(guessRow, guessedChampion.name, guessedChampion.name === targetChampion.name ? 'correct' : 'incorrect', true);
            addGuessCell(guessRow, guessedChampion.gender, guessedChampion.gender === targetChampion.gender ? 'correct' : 'incorrect');
            
            // Verificação especial para idade (com setas)
            const guessedAge = parseInt(guessedChampion.idade);
            const targetAge = parseInt(targetChampion.idade);
            
            addAgeCell(guessRow, guessedChampion.idade, guessedAge, targetAge);
            
            addGuessCell(guessRow, guessedChampion.estado, guessedChampion.estado === targetChampion.estado ? 'correct' : 'incorrect');
            addGuessCell(guessRow, guessedChampion.banido, guessedChampion.banido === targetChampion.banido ? 'correct' : 'incorrect');
            addGuessCell(guessRow, guessedChampion.origem, guessedChampion.origem === targetChampion.origem ? 'correct' : 'incorrect');
            
            guessesContainer.appendChild(guessRow);
            
            // Verificar vitória
            if (guess.toLowerCase() === targetChampion.name.toLowerCase()) {
                endGame(true);
            } else if (attempts >= maxAttempts) {
                endGame(false);
            }
            
            championInput.value = '';
        }
        
        // Adicionar célula à linha de palpite
        function addGuessCell(row, content, status, isImage = false) {
            const cell = document.createElement('div');
            cell.className = `guess-cell guess-content ${status}`;
            
            if (isImage) {
                const img = document.createElement('img');
                // Usando placeholder para imagem (substitua pelo caminho real das imagens)
                img.src = `./img/${championInput.value.toLowerCase()}.png`;
                img.alt = content;
                img.className = 'champion-image';
                img.onerror = function() {
                    this.style.display = 'none';
                    const text = document.createElement('span');
                    text.textContent = content;
                    cell.appendChild(text);
                };
                cell.appendChild(img);
            } else {
                cell.textContent = content;
            }
            
            row.appendChild(cell);
        }
        
        // Adicionar célula de idade com seta
        function addAgeCell(row, content, guessedAge, targetAge) {
            const cell = document.createElement('div');
            cell.className = 'guess-cell guess-content';
            
            const ageContainer = document.createElement('div');
            ageContainer.className = 'age-container';
            
            const ageText = document.createElement('span');
            ageText.textContent = content;
            
            ageContainer.appendChild(ageText);
            
            if (guessedAge === targetAge) {
                cell.classList.add('correct');
            } else {
                const arrow = document.createElement('span');
                arrow.className = 'arrow';
                cell.classList.add('incorrect');
                
                if (guessedAge > targetAge) {
                    arrow.classList.add('arrow-up');
                    arrow.textContent = '↓';
                } else {
                    arrow.classList.add('arrow-down');
                    arrow.textContent = '↑';
                }
                
                ageContainer.appendChild(arrow);
            }
            
            cell.appendChild(ageContainer);
            row.appendChild(cell);
        }
        
        // Finalizar o jogo
        function endGame(isVictory) {
            gameOver = true;
            
            if (isVictory) {
                resultMessage.textContent = `Parabéns! Você adivinhou em ${attempts} tentativa(s)!`;
                resultMessage.className = 'result-message victory';
            } else {
                resultMessage.textContent = `Fim de jogo! O integrante era ${targetChampion.name}.`;
                resultMessage.className = 'result-message defeat';
            }
            
            resultMessage.style.display = 'block';
            newGameBtn.style.display = 'block';
            championInput.disabled = true;
            submitGuess.disabled = true;
        }
        
        // Event Listeners
        submitGuess.addEventListener('click', checkGuess);
        
        championInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkGuess();
            }
        });
        
        newGameBtn.addEventListener('click', initGame);
        
        // Iniciar o jogo
        initGame();

