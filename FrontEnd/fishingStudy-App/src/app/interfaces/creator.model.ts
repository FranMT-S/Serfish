export interface creator{
    img?: string,
    Name :string,
    role : string,
    Info : string
    participation: participation[]

}
interface participation{
    labor:string,
    percent:string,
}