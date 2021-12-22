export interface IUpdateUserRequestDTO {
    hash: string
    name?: string;
    surname?: string;
    bio?: string;
    telephone?: string;
    end_state?: string;
    end_city?: string;
    end_number?: string;
    end_district?: string;
    end_cep?: string;
    image?: Express.Multer.File;
}