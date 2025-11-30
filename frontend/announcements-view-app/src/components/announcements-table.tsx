import { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export type Announcement = {
    id: number
    userId: number
    name: string
    description: string
}

interface AnnouncementsTableProps {
    data: Announcement[]
}

export function AnnouncementsTable({ data }: AnnouncementsTableProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    // Фильтрация данных
    const filteredData = data.filter(announcement =>
        announcement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Пагинация
    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

    const handleView = (announcement: Announcement) => {
        alert(`Название: ${announcement.name}\nОписание: ${announcement.description}\nUser ID: ${announcement.userId}`)
    }

    return (
        <div className="space-y-4">
            {/* Поиск */}
            <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-500" />
                <Input
                    placeholder="Поиск по названию или описанию..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setCurrentPage(1) // Сброс на первую страницу при поиске
                    }}
                    className="max-w-sm"
                />
            </div>

            {/* Таблица */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">ID</TableHead>
                            <TableHead className="w-[100px]">User ID</TableHead>
                            <TableHead>Название</TableHead>
                            <TableHead>Описание</TableHead>
                            <TableHead className="w-[100px]">Действия</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((announcement) => (
                                <TableRow key={announcement.id}>
                                    <TableCell className="font-medium">{announcement.id}</TableCell>
                                    <TableCell>{announcement.userId}</TableCell>
                                    <TableCell className="max-w-[200px] truncate" title={announcement.name}>
                                        {announcement.name}
                                    </TableCell>
                                    <TableCell className="max-w-[300px] truncate" title={announcement.description}>
                                        {announcement.description}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleView(announcement)}
                                        >
                                            Просмотр
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    Объявления не найдены
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Пагинация */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Показано {paginatedData.length} из {filteredData.length} объявлений
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Назад
                        </Button>
                        <span className="text-sm">
              Страница {currentPage} из {totalPages}
            </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Вперед
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}