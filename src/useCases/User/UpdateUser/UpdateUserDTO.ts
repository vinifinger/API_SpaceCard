export interface IUpdateUserRequestDTO {
    hash: string
    name?: string;
    surname?: string;
    bio?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    telephone?: string;
    instagram?: string;
    whatsapp?: string;
    telegram?: string;
    tiktok?: string;
    spotify?: string;
    youtube?: string;
    wildcard_1?: string;
    wildcard_2?: string;
    wildcard_3?: string;
    end_state?: string;
    end_city?: string;
    end_number?: string;
    end_district?: string;
    end_cep?: string;
}