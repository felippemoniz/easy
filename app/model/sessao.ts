export class sessao{
 constructor(
 public idfilme?: number,
  public idcinema?: number,
 public nomeFilme?: string,
 public nomeCinema?: string,
 public horaInicio?: string,
 public horaFim?: string,
 public duracao?: number,
 public rating?: number,
 public imagemAvatar?: string,
 public latitude?:number,
 public longitude?:number,
 public distancia?:number,
 public selecionado?: boolean)
 {}
}
