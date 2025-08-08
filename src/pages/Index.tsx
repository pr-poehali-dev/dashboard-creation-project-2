import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [currentView, setCurrentView] = useState('templates');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const dashboardTemplates = [
    {
      id: '1',
      title: 'Финансовая аналитика',
      description: 'Отчеты по доходам, расходам и прибыли',
      category: 'Финансы',
      widgets: ['Графики доходов', 'Таблицы расходов', 'KPI метрики'],
      preview: '📊'
    },
    {
      id: '2',
      title: 'Операционная деятельность',
      description: 'Мониторинг ключевых операционных показателей',
      category: 'Операции',
      widgets: ['Производительность', 'Качество услуг', 'Временные ряды'],
      preview: '📈'
    },
    {
      id: '3',
      title: 'Управление персоналом',
      description: 'HR метрики и аналитика по сотрудникам',
      category: 'HR',
      widgets: ['Штатная численность', 'Эффективность', 'Обучение'],
      preview: '👥'
    },
    {
      id: '4',
      title: 'Клиентская аналитика',
      description: 'Анализ поведения и удовлетворенности клиентов',
      category: 'CRM',
      widgets: ['Сегментация клиентов', 'NPS', 'Конверсия'],
      preview: '🎯'
    }
  ];

  const widgetLibrary = [
    { name: 'Линейный график', icon: 'TrendingUp', category: 'Графики' },
    { name: 'Столбчатая диаграмма', icon: 'BarChart3', category: 'Графики' },
    { name: 'Круговая диаграмма', icon: 'PieChart', category: 'Графики' },
    { name: 'Таблица данных', icon: 'Table', category: 'Таблицы' },
    { name: 'KPI карточка', icon: 'Activity', category: 'Метрики' },
    { name: 'Фильтр по датам', icon: 'Calendar', category: 'Фильтры' },
    { name: 'Выпадающий список', icon: 'Filter', category: 'Фильтры' },
    { name: 'Карта', icon: 'Map', category: 'Геоданные' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img 
                src="https://cdn.poehali.dev/files/20ae16f8-1fdc-4081-b1f5-6d6ac5c23ab0.jpg" 
                alt="РЖД Logo" 
                className="h-8 w-auto"
              />
              <div>
                <h1 className="text-xl font-semibold text-slate-900">Платформа дашбордов</h1>
                <p className="text-sm text-slate-600">Создавайте и управляйте аналитическими панелями</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </Button>
              <Button size="sm">
                <Icon name="Plus" size={16} className="mr-2" />
                Создать дашборд
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={currentView} onValueChange={setCurrentView} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="templates">Шаблоны</TabsTrigger>
            <TabsTrigger value="constructor">Конструктор</TabsTrigger>
            <TabsTrigger value="my-dashboards">Мои дашборды</TabsTrigger>
          </TabsList>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Шаблоны дашбордов</h2>
                <p className="text-slate-600">Выберите готовый шаблон для быстрого старта</p>
              </div>
              <div className="flex gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Категория" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    <SelectItem value="finance">Финансы</SelectItem>
                    <SelectItem value="operations">Операции</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="crm">CRM</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  placeholder="Поиск шаблонов..." 
                  className="w-48" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {dashboardTemplates
                .filter(template => 
                  (selectedCategory === 'all' || template.category.toLowerCase().includes(selectedCategory.toLowerCase())) &&
                  template.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{template.preview}</div>
                        <div>
                          <CardTitle className="text-lg">{template.title}</CardTitle>
                          <Badge variant="secondary" className="mt-1">{template.category}</Badge>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          setSelectedTemplate(template.id);
                          setIsTemplateDialogOpen(true);
                        }}
                      >
                        <Icon name="Eye" size={16} className="mr-1" />
                        Просмотр
                      </Button>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {template.widgets.map((widget, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {widget}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button 
                        className="flex-1" 
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Дашборд создан!",
                            description: `Шаблон "${template.title}" скопирован в ваши проекты`
                          });
                          setCurrentView('my-dashboards');
                        }}
                      >
                        <Icon name="Rocket" size={16} className="mr-2" />
                        Использовать
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Шаблон скопирован!",
                            description: "Шаблон добавлен в конструктор"
                          });
                        }}
                      >
                        <Icon name="Copy" size={16} className="mr-2" />
                        Копировать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Constructor Tab */}
          <TabsContent value="constructor" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Конструктор дашбордов</h2>
              <p className="text-slate-600">Создайте дашборд с нуля, используя библиотеку виджетов</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Widget Library */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Icon name="Layers" size={20} className="mr-2" />
                    Библиотека виджетов
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {['Графики', 'Таблицы', 'Метрики', 'Фильтры', 'Геоданные'].map((category) => (
                    <div key={category} className="space-y-2">
                      <h4 className="font-medium text-sm text-slate-700">{category}</h4>
                      <div className="space-y-1">
                        {widgetLibrary
                          .filter(widget => widget.category === category)
                          .map((widget, index) => (
                            <div key={index} className="flex items-center p-2 rounded border border-dashed border-slate-300 hover:bg-slate-50 cursor-grab">
                              <Icon name={widget.icon as any} size={16} className="mr-2 text-slate-500" />
                              <span className="text-sm">{widget.name}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Canvas */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Icon name="Layout" size={20} className="mr-2" />
                      Холст дашборда
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Icon name="Undo" size={16} className="mr-1" />
                        Отменить
                      </Button>
                      <Button size="sm">
                        <Icon name="Save" size={16} className="mr-1" />
                        Сохранить
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="min-h-96 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-500">
                    <div className="text-center space-y-2">
                      <Icon name="MousePointer2" size={48} className="mx-auto text-slate-400" />
                      <p className="text-lg font-medium">Перетащите виджеты сюда</p>
                      <p className="text-sm">Начните создание дашборда, перетаскивая элементы из библиотеки</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* My Dashboards Tab */}
          <TabsContent value="my-dashboards" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Мои дашборды</h2>
                <p className="text-slate-600">Управляйте созданными дашбордами</p>
              </div>
              <Button onClick={() => setCurrentView('constructor')}>
                <Icon name="Plus" size={16} className="mr-2" />
                Создать новый
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">Дашборд {i}</CardTitle>
                        <Badge variant="secondary" className="mt-1">В работе</Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Icon name="MoreHorizontal" size={16} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-4">Последнее изменение: сегодня</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => {
                          toast({
                            title: "Дашборд открыт!",
                            description: "Переходим к редактированию..."
                          });
                        }}
                      >
                        <Icon name="Eye" size={16} className="mr-1" />
                        Открыть
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Ссылка скопирована!",
                            description: "Дашборд можно поделить с коллегами"
                          });
                        }}
                      >
                        <Icon name="Share2" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Template Preview Dialog */}
        <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <span className="text-2xl">
                  {selectedTemplate && dashboardTemplates.find(t => t.id === selectedTemplate)?.preview}
                </span>
                <span>
                  {selectedTemplate && dashboardTemplates.find(t => t.id === selectedTemplate)?.title}
                </span>
              </DialogTitle>
              <DialogDescription>
                {selectedTemplate && dashboardTemplates.find(t => t.id === selectedTemplate)?.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Card className="p-4">
                <h4 className="font-semibold mb-2">📊 Пример дашборда</h4>
                <div className="bg-slate-100 h-48 rounded flex items-center justify-center text-slate-500">
                  Превью дашборда
                </div>
              </Card>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">🔧 Включенные виджеты</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate && dashboardTemplates.find(t => t.id === selectedTemplate)?.widgets.map((widget, index) => (
                      <Badge key={index} variant="outline">{widget}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">📋 Возможности</h4>
                  <ul className="text-sm space-y-1 text-slate-600">
                    <li>• Интерактивные графики и диаграммы</li>
                    <li>• Система фильтров по датам и категориям</li>
                    <li>• Экспорт данных в Excel/PDF</li>
                    <li>• Настраиваемые KPI метрики</li>
                  </ul>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      const template = dashboardTemplates.find(t => t.id === selectedTemplate);
                      toast({
                        title: "Дашборд создан!",
                        description: `Шаблон "${template?.title}" добавлен в ваши проекты`
                      });
                      setIsTemplateDialogOpen(false);
                      setCurrentView('my-dashboards');
                    }}
                  >
                    <Icon name="Rocket" size={16} className="mr-2" />
                    Создать дашборд
                  </Button>
                  <Button variant="outline">
                    <Icon name="Copy" size={16} className="mr-2" />
                    В конструктор
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
      </main>
      
      <Toaster />
    </div>
  );
};

export default Index;