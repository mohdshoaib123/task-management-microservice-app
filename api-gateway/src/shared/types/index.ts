 export interface ApiResponse<T=unknown>{
  success:boolean,
  data?:T,
  err?:{
    code:string,
    message:string,
    details?:Record<string,unknown>
  }
}
