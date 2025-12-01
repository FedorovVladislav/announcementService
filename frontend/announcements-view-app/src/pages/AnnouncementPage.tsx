import {type Announcement, AnnouncementsTable} from "@/components/announcements-table.tsx";

export function AnnouncementPage () {

    const mockData: Announcement[] = [
        {
            id: 1,
            userId: 101,
            name: "Продам автомобиль Toyota Camry",
            description: "Продается Toyota Camry 2018 года в отличном состоянии. Пробег 50 000 км."
        },
        {
            id: 2,
            userId: 102,
            name: "Сниму квартиру в центре",
            description: "Ищу 2-х комнатную квартиру в центре города для долгосрочной аренды."
        },
        {
            id: 3,
            userId: 103,
            name: "Услуги веб-разработчика",
            description: "Профессиональная разработка сайтов под ключ. Frontend, Backend, базы данных."
        },
        {
            id: 4,
            userId: 104,
            name: "Курсы английского языка",
            description: "Индивидуальные занятия английским языком для всех уровней. Подготовка к IELTS."
        },
        {
            id: 5,
            userId: 105,
            name: "Продам мебельный гарнитур",
            description: "Продается угловой диван и журнальный столик. Состояние идеальное."
        },
        {
            id: 6,
            userId: 106,
            name: "Ремонт компьютеров и ноутбуков",
            description: "Качественный ремонт компьютерной техники. Установка ПО, замена комплектующих."
        },
        {
            id: 7,
            userId: 107,
            name: "Фотосессия на природе",
            description: "Профессиональная фотосессия в парке или за городом. Индивидуальный подход."
        },
        {
            id: 8,
            userId: 108,
            name: "Услуги няни",
            description: "Присмотр за детьми от 3 лет. Опыт работы с детьми 7 лет. Есть рекомендации."
        },
        {
            id: 9,
            userId: 109,
            name: "Репетитор по математике",
            description: "Подготовка к ЕГЭ, ОГЭ по математике для школьников 9-11 классов."
        },
        {
            id: 10,
            userId: 110,
            name: "Доставка домашней еды",
            description: "Ежедневная доставка свежей домашней еды. Разнообразное меню."
        }
    ]

    return (
        <AnnouncementsTable data={mockData}/>
    )
}