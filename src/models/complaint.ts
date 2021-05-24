export default interface Complaint {
    Id: string,
    Category: string,
    TargetFirstName: string,
    TargetLastName: string,
    SendDate: Date,
    Note: string,
    Status: string
}