<template>
    <div class="container" style="direction: rtl;">
        <hr>
        <button @click="currentSection = 'appSettings'">الإعدادات</button>
        <button @click="currentSection = 'appBulletin'">بطاقة النتائج المدرسية (تقريبية)</button>

        <keep-alive>
            <component :is="currentSection" :disciplines="disciplines" :markNames="markNames"></component>
        </keep-alive>
    </div>
</template>

<script>
    import { eventBusBulletin } from './main.js'

    import Settings from './components/Settings.vue'
    import Bulletin from './components/Bulletin.vue'

    export default {
        data: function(){
            return {
                currentSection:'appBulletin',
                disciplines: [
                    {
                        "name": "عربية",
                        "coef": "4",
                        "average": "",
                        "total": "",
                        "exempt": false,
                        "marks": [{
                            "name": "انشاء ف.م.1",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "دراسة نص ف.م.1",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "انشاء فرض تاليفي",
                            "coef": "2",
                            "val": ""
                        }, {
                            "name": "دراسة فرض تاليفي",
                            "coef": "2",
                            "val": ""
                        }, {
                            "name": "شفاهي",
                            "coef": "1",
                            "val": ""
                        }]
                    },
                    {
                        "name": "فرنسية",
                        "coef": "4",
                        "average": "",
                        "total": "",
                        "exempt": false,
                        "marks": [{
                            "name": "شفاهي",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "ف.م.1",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "ف.م.2",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "فرض تاليفي",
                            "coef": "2",
                            "val": ""
                        }]
                    }, {
                        "name": "أنقليزية",
                        "coef": "1.5",
                        "average": "",
                        "total": "",
                        "exempt": false,
                        "marks": [{
                            "name": "شفاهي",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "ف.م.1",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "ف.م.2",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "فرض تاليفي",
                            "coef": "2",
                            "val": ""
                        }]
                    }, {
                        "name": "تاريخ",
                        "coef": "1",
                        "average": "",
                        "total": "",
                        "exempt": false,
                        "marks": [{
                            "name": "اختبار كتابي",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "فرض تاليفي",
                            "coef": "2",
                            "val": ""
                        }]
                    }, {
                        "name": "جغرافيا",
                        "coef": "1",
                        "average": "",
                        "total": "",
                        "exempt": false,
                        "marks": [{
                            "name": "اختبار كتابي",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "فرض تاليفي",
                            "coef": "2",
                            "val": ""
                        }]
                    }, {
                        "name": "تربية اسلامية",
                        "coef": "1",
                        "average": "",
                        "total": "",
                        "exempt": false,
                        "marks": [{
                            "name": "شفاهي",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "ف.م.1",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "فرض تاليفي",
                            "coef": "2",
                            "val": ""
                        }]
                    }, {
                        "name": "تربية مدنية",
                        "coef": "1",
                        "average": "",
                        "total": "",
                        "exempt": false,
                        "marks": [{
                            "name": "شفاهي",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "اختبار كتابي",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "فرض تاليفي",
                            "coef": "2",
                            "val": ""
                        }]
                    }, {
                        "name": "رياضيات",
                        "coef": "3",
                        "average": "",
                        "total": "",
                        "exempt": false,
                        "marks": [{
                            "name": "ف.م.1",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "ف.م.2",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "فرض تاليفي",
                            "coef": "2",
                            "val": ""
                        }]
                    }, {
                        "name": "علوم فيزيائية",
                        "coef": "1",
                        "average": "",
                        "total": "",
                        "exempt": false,
                        "marks": [{
                            "name": "ف.م.1",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "فرض تاليفي",
                            "coef": "2",
                            "val": ""
                        }]
                    }, {
                        "name": "ع.ح و الارض",
                        "coef": "1",
                        "average": "",
                        "total": "",
                        "exempt": false,
                        "marks": [{
                            "name": "اشغال تطبيقية",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "ف.م.1",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "فرض تاليفي",
                            "coef": "2",
                            "val": ""
                        }]
                    }, {
                        "name": "تربية تكنولوجية",
                        "coef": "1",
                        "average": "",
                        "total": "",
                        "exempt": false,
                        "marks": [{
                            "name": "شفاهي",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "اختبار كتابي",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "فرض تاليفي",
                            "coef": "2",
                            "val": ""
                        }]
                    }, {
                        "name": "اعلامية",
                        "coef": "1",
                        "average": "",
                        "total": "",
                        "exempt": false,
                        "marks": [{
                            "name": "ف.م.1",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "فرض تاليفي",
                            "coef": "2",
                            "val": ""
                        }]
                    }, {
                        "name": "تربية موسيقية",
                        "coef": "1",
                        "average": "",
                        "total": "",
                        "exempt": false,
                        "marks": [{
                            "name": "شفاهي",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "اختبار كتابي",
                            "coef": "1",
                            "val": ""
                        }]
                    }, {
                        "name": "تربية تشكيلية",
                        "coef": "1",
                        "average": "",
                        "total": "",
                        "exempt": false,
                        "marks": [{
                            "name": "شفاهي",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "اختبار كتابي",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "فرض تاليفي",
                            "coef": "2",
                            "val": ""
                        }]
                    }, {
                        "name": "تربية مسرحية",
                        "coef": "1",
                        "average": "",
                        "total": "",
                        "exempt": false,
                        "marks": [{
                            "name": "شفاهي",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "فرض تاليفي",
                            "coef": "2",
                            "val": ""
                        }]
                    }, {
                        "name": "تربية بدنية",
                        "coef": "1",
                        "average": "",
                        "total": "",
                        "exempt": false,
                        "marks": [{
                            "name": "ف.م.1",
                            "coef": "1",
                            "val": ""
                        }, {
                            "name": "فرض تاليفي",
                            "coef": "2",
                            "val": ""
                        }]
                    }
                ],
                markNames: [
                    'شفاهي',
                    'اشغال تطبيقية',
                    'اختبار كتابي',
                    'ف.م.1',
                    'ف.م.2',
                    'فرض تاليفي',
                    'انشاء ف.م.1',
                    'انشاء فرض تاليفي',
                    'دراسة نص ف.م.1',
                    'دراسة فرض تاليفي',
                ],
            }
        },
        components:{
            "appSettings": Settings,
            "appBulletin": Bulletin,
        },
        created:function(){
            //disciplinesUpdated
            eventBusBulletin.$on("disciplinesUpdated", function(newDisciplines){
                this.disciplines = newDisciplines
            })
        }
    }

</script>

<style>
</style>