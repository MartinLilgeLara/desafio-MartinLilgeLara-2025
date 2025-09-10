class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    // Definindo os dados dos animais e seus brinquedos favoritos
    const animais = {
      
      'Mimi': { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      'Fofo': { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      'Zero': { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      'Bola': { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      'Bebe': { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      'Loco': { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] },
      'Rex': { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
    };

    const brinquedosPessoa = [brinquedosPessoa1.split(','), brinquedosPessoa2.split(',')];
    const listaAnimais = ordemAnimais.split(',');
    const resultado = {};
    let animaisAdotadosPorPessoa = [0, 0];

    // Validando a entrada de animais
    for (const animal of listaAnimais) {
      if (!(animal in animais)) {
        return { erro: 'Animal inválido' };
      }
    }

    // Validando a entrada de brinquedos
    const todosBrinquedos = Object.values(animais).flatMap(a => a.brinquedos);
    for (const brinquedos of brinquedosPessoa) {
      const brinquedosUnicos = new Set(brinquedos);
      if (brinquedos.length !== brinquedosUnicos.size) {
        return { erro: 'Brinquedo inválido' };
      }
      for (const brinquedo of brinquedos) {
        if (!todosBrinquedos.includes(brinquedo)) {
          return { erro: 'Brinquedo inválido' };
        }
      }
    }

    listaAnimais.sort().forEach(animal => {
        let pessoaAdotante = null;

        if (animal !== 'Loco') {
        const brinquedosFavoritos = animais[animal].brinquedos;
        
        if (this.verificaBrinquedos(brinquedosPessoa[0], brinquedosFavoritos) && this.verificaOrdem(brinquedosPessoa[0], brinquedosFavoritos) && animaisAdotadosPorPessoa[0] < 3) {
          if (animais[animal].tipo !== 'gato' || !Object.keys(resultado).some(adotado => {
            const animalAdotado = adotado;
            const brinquedosAdotado = animais[animalAdotado].brinquedos;
            return resultado[animalAdotado] === 'pessoa 1' && brinquedosAdotado.some(brinq => brinquedosFavoritos.includes(brinq));
          })) {
            if (!(this.verificaBrinquedos(brinquedosPessoa[1], brinquedosFavoritos) && this.verificaOrdem(brinquedosPessoa[1], brinquedosFavoritos))) {
              pessoaAdotante = 1;
            }
          }
        } else if (this.verificaBrinquedos(brinquedosPessoa[1], brinquedosFavoritos) && this.verificaOrdem(brinquedosPessoa[1], brinquedosFavoritos) && animaisAdotadosPorPessoa[1] < 3) {
          if (animais[animal].tipo !== 'gato' || !Object.keys(resultado).some(adotado => {
            const animalAdotado = adotado;
            const brinquedosAdotado = animais[animalAdotado].brinquedos;
            return resultado[animalAdotado] === 'pessoa 2' && brinquedosAdotado.some(brinq => brinquedosFavoritos.includes(brinq));
          })) {
            if (!(this.verificaBrinquedos(brinquedosPessoa[0], brinquedosFavoritos) && this.verificaOrdem(brinquedosPessoa[0], brinquedosFavoritos))) {
              pessoaAdotante = 2;
            }
          }
        }
        if (pessoaAdotante !== null) {
        resultado[animal] = `pessoa ${pessoaAdotante}`;
        animaisAdotadosPorPessoa[pessoaAdotante - 1]++;
      } else {
        resultado[animal] = 'abrigo';
      }
        
      }else if (animal === 'Loco') {
        const brinquedosFavoritos = animais[animal].brinquedos;
        
        if (animaisAdotadosPorPessoa[0] > 0) {
          if (this.verificaBrinquedos(brinquedosPessoa[0], brinquedosFavoritos) && animaisAdotadosPorPessoa[0] < 3) {
            if (!(this.verificaBrinquedos(brinquedosPessoa[1], brinquedosFavoritos) && animaisAdotadosPorPessoa[1] < 3)) {
              pessoaAdotante = 1;
            }
          }
        } else {
          if (this.verificaBrinquedos(brinquedosPessoa[0], brinquedosFavoritos) && this.verificaOrdem(brinquedosPessoa[0], brinquedosFavoritos) && animaisAdotadosPorPessoa[0] < 3) {
            if (!(this.verificaBrinquedos(brinquedosPessoa[1], brinquedosFavoritos) && this.verificaOrdem(brinquedosPessoa[1], brinquedosFavoritos) && animaisAdotadosPorPessoa[1] < 3)) {
              pessoaAdotante = 1;
            }
          }
        }

        if (animaisAdotadosPorPessoa[1] > 0) {
          if (this.verificaBrinquedos(brinquedosPessoa[1], brinquedosFavoritos) && animaisAdotadosPorPessoa[1] < 3) {
            if (!(this.verificaBrinquedos(brinquedosPessoa[0], brinquedosFavoritos) && animaisAdotadosPorPessoa[0] < 3)) {
              pessoaAdotante = 2;
            }
          }
        } else {
          if (this.verificaBrinquedos(brinquedosPessoa[1], brinquedosFavoritos) && this.verificaOrdem(brinquedosPessoa[1], brinquedosFavoritos) && animaisAdotadosPorPessoa[1] < 3) {
            if (!(this.verificaBrinquedos(brinquedosPessoa[0], brinquedosFavoritos) && this.verificaOrdem(brinquedosPessoa[0], brinquedosFavoritos) && animaisAdotadosPorPessoa[0] < 3)) {
              pessoaAdotante = 2;
            }
          }
        }
        if (pessoaAdotante !== null) {
        resultado[animal] = `pessoa ${pessoaAdotante}`;
        animaisAdotadosPorPessoa[pessoaAdotante - 1]++;
      } else {
        resultado[animal] = 'abrigo';
      }
      }
    });

    const lista = Object.keys(resultado).map(animal => `${animal} - ${resultado[animal]}`);
    return { lista };
  }

  verificaBrinquedos(brinquedosPessoa, brinquedosFavoritos) {
    return brinquedosFavoritos.every(brinquedo => brinquedosPessoa.includes(brinquedo));
  }

  verificaOrdem(brinquedosPessoa, brinquedosFavoritos) {
    let indice = 0;
    for (const brinquedo of brinquedosPessoa) {
      if (brinquedo === brinquedosFavoritos[indice]) {
        indice++;
        if (indice === brinquedosFavoritos.length) return true;
      }
    }
    return false;
  }
    
}
const abrigo = new AbrigoAnimais();
const resultado = abrigo.encontraPessoas('RATO,BOLA,SKATE,CAIXA,NOVELO', 'RATO,SKATE,NOVELO,BOLA', 'Bola,Loco');
console.log(resultado);

// Exemplo de uso
