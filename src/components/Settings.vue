<template>
    <div style="direction:rtl;">
        <hr>
        <h1>الإعدادات</h1>
        <hr>
        <div id="les_matieres">
            <h2>قائمة المواد</h2>
            <table style="font-size: 2.5rem;">
                <tr>
                    <th>المادة</th>
                    <th>الضارب</th>
                    <th>الأعداد</th>
                </tr>
                <tr v-for="( discipline, index ) in disciplines">
                    <td>{{ discipline.name }}</td>
                    <td>{{ discipline.coef }}</td>
                    <td>
                        <table style="font-size: 2rem;">
                            <tr v-for="mark in discipline.marks">
                                <td>{{ mark.name }}</td>
                                <td>{{ mark.coef }}</td>
                            </tr>
                        </table>
                    </td>

                    <td><button @click="editDiscipline( index )">تغير</button></td>
                </tr>
            </table>
        </div>
        <hr>
        <div id="nouvelle_matiere">
            <h2>إضافة مادة جديدة</h2>
            <label>المادة
                <select v-model="new_discipline.name">
                    <option v-for="discipline in discipline_names" :value="discipline">{{ discipline }}</option>
                </select>
            </label>

            <label>
                الضارب
                <input type="number" v-model="new_discipline.coef">
            </label>
            <div class="notes" v-if="new_discipline.name != ''">
                <h3>أعداد المادة "<strong>{{ new_discipline.name }}</strong>"</h3>
                <ul style="list-style: none;">
                    <li v-for="( mark,index ) in new_discipline.marks">
                        <select v-model="new_discipline.marks[index].name">
                            <option v-for="mark_name in markNames" :value="mark_name">{{ mark_name }}</option>
                        </select>
                        <label>
                            الضارب
                            <input type="number" v-model="new_discipline.marks[index].coef">
                        </label>
                        <button @click="removeMark(index)" :disabled="new_discipline.marks.length == 1">X</button>
                    </li>
                </ul>
                <button @click="addMark()" :disabled="markNames.length == new_discipline.marks.length">+ عدد جديد</button>
            </div>
            <hr>
            <button @click="addDiscipline()" :disabled="new_discipline.name == ''">أضف المادة</button>
        </div>
        <hr>
    </div>
</template>

<script>
    import { eventBusBulletin } from '../main.js'


    export default {
        props: ['disciplines', 'markNames'],

        data: function(){
            return {

                discipline_names: [
                    'عربية',
                    'فرنسية',
                    'أنقليزية',
                    'تاريخ',
                    'جغرافيا',
                    'تربية اسلامية',
                    'تربية مدنية',
                    'رياضيات',
                    'علوم فيزيائية',
                    'ع.ح و الارض',
                    'تربية تكنولوجية',
                    'اعلامية',
                    'تربية موسيقية',
                    'تربية تشكيلية',
                    'تربية مسرحية',
                    'تربية بدنية',
                ],

                new_discipline:{
                    'name': '',
                    'coef': '1',
                    'marks': [
                        {
                            'name': '',
                            'coef': '1'
                        }
                    ],
                }
            }
        },
        methods:{
            addMark: function(){
                if( this.markNames.length > this.new_discipline.marks.length ){
                    this.new_discipline.marks.push({'name': '','coef': 1, 'val':''})                    
                }
            },
            removeMark: function(index){
                if( this.new_discipline.marks.length > 1 ){
                    this.new_discipline.marks = this.new_discipline.marks.filter( function(el,ind){ return ind != index } )
                }
            },
            addDiscipline: function(){
                var self = this

                var isAlreadyThere = true
                
                isAlreadyThere = this.disciplines.find( function(el){
                    return el.name == self.new_discipline.name
                })

                if( isAlreadyThere == undefined ){
                    var tmpDisciplines = this.disciplines
                    
                    tmpDisciplines.push( this.new_discipline )
                    
                    this.new_discipline = {
                        'name': '',
                        'coef': 1,
                        "average": "",
                        "total": "",
                        "exempt": false,
                        'marks': [
                            {
                                'name': '',
                                'coef': 1
                            }
                        ],
                    }

                    // Emit event
                    eventBusBulletin.$emit("disciplinesUpdated", tmpDisciplines)
                }else{
                    var self = this

                    var remaining = []

                    remaining = this.discipline_names.filter( function(dis){
                        var found = self.disciplines.find(function(el){
                            return dis == el.name
                        })

                        if( found == undefined ){
                            return true
                        }else{
                            return false                            
                        }
                    })

                    alert("مادة ال"+this.new_discipline.name+" موجودة في الجدول !")
                    if( remaining.length ){
                        alert( "الرجاء إضافة هذه المواد : "+remaining.join(', ') )
                    }
                }

            },
            removeDiscipline: function(index){
                this.disciplines = this.disciplines.filter( function(el,ind){ return ind != index } )
            },
            editDiscipline: function(index){
                this.new_discipline = this.disciplines[index]
                this.removeDiscipline(index)
                
                var elmnt = document.getElementById("nouvelle_matiere");
                elmnt.scrollIntoView();

            }
        }
    }

</script>

<style scoped>
    input[type="number"] {
        width: 4rem;
    }

    table {
        width: 100%;
    }
    td,th{
        border: 1px grey solid;
        padding: 3px;
        text-align: center;
    }
</style>
