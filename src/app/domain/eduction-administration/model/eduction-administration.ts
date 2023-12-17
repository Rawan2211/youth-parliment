export interface EducationAdministration {
    "id": number,
    "version": number,
    "arabicName": string,
    "englishName": string,
    "code": string,
    "enabled": boolean,
    "governorate": {
        "id": number,
        "version": number,
        "arabicName": string,
        "englishName": string,
        "code": string,
        "enabled": boolean
    }
}