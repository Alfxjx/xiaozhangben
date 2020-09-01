export class CreateLedgeDTO {
    price: number;
    porn: string;
    userId: string;
    description: string;
    // TODO 上传的时候将数据表示成按照逗号分割的string，后端会切割成数组
    tag: string[];
    category: string;
    star: boolean;  
}
