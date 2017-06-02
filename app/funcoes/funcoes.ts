  formataDistanciaAmigavel(distancia){

    if (distancia <= 2) {
      return "Bem perto";
    }
    else if (distancia > 2 && distancia <= 5){
      return "Perto";
    }
    else if (distancia > 5 && distancia <= 20){
      return "Um pouco longe";
    }
    else {
      return "Bem longe";
    }

  }