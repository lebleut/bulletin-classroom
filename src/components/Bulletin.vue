<template>
    <div>
        <hr>
        <h2 style="text-align:center; direction:rtl;">المدرسة الإعدادية بالبقالطة</h2>
        <h1 style="text-align:center; direction:rtl;">بطاقة النتائج المدرسية (تقريبية)</h1>
        <hr>
        <table style="margin-left: auto; margin-right: auto;">
            <tr>
                <th>المادة</th>
                <th>المعدل</th>
                
                <th v-for="markName in markNames">{{ markName }}</th>

            </tr>
            <tr :class="{exempt: discipline.exempt}" v-for="( discipline, indd ) in disciplines">
                <td class="discipline_name">
                    {{ discipline.name }}
                    <button
                        class="ext"
                        style="float: left;"
                        @click="disciplines[indd].exempt = !disciplines[indd].exempt"
                        tabIndex="-1"
                    >معفى<span> ؟</span></button>
                </td>
                <td><span v-if="!discipline.exempt" style="font-weight: bold;">{{ discipline.average }}</span></td>
                
                <td v-for="( markName, indm ) in markNames">
                    <template v-if="!discipline.exempt && discipline.marks.filter(function(mrk){ return mrk.name == markName }).length > 0">
                        <input
                            type="number"
                            v-model="discipline.marks.filter( function(m){ return m.name == markName })[0].val"
                            @input="marksUpdated()"
                            placeholder="--.--"
                            :class="{
                                empty: discipline.marks.filter( function(m){ return m.name == markName })[0].val == '',
                                filled: parseFloat(discipline.marks.filter( function(m){ return m.name == markName })[0].val) <= 20 && parseFloat(discipline.marks.filter( function(m){ return m.name == markName })[0].val) > 0,
                                zero: parseFloat(discipline.marks.filter( function(m){ return m.name == markName })[0].val) == 0,
                                error: parseFloat(discipline.marks.filter( function(m){ return m.name == markName })[0].val) > 20 || parseFloat(discipline.marks.filter( function(m){ return m.name == markName })[0].val) < 0
                            }"
                        >
                    </template>
                    <template v-else>
                        <button
                            class="add"
                            :title="'إضافة عدد ('+markName+') لمادة (ال'+discipline.name+')'"
                            @click="addNewMarkForDiscipline(markName, discipline.name)"
                            tabIndex="-1"
                        >+</button>
                    </template>
                </td>

            </tr>
            <tr style="background: burlywood; font-weight: bold; font-size: large;">
                <td>المعدل العام</td>
                <td>{{ average }}</td>
            </tr>
        </table>
        <app-feedback/>
    </div>

</template>

<script>
    import { eventBusBulletin } from '../main.js'

    import Feedback from './Feedback.vue'

    export default {
        
        props: ['disciplines', 'markNames'],

        data: function(){
            return {
            }
        },
        components:{
            "app-feedback": Feedback,
        },
        methods:{
            disciplineAverage: function(discip){
                var sumMarks = discip.marks.reduce( function(acc, mark){
                    return parseFloat(acc) + ( parseFloat(mark.val) * parseFloat(mark.coef) )
                }, 0)

                var sumCoefs = discip.marks.reduce( function(acc, mark){
                    return parseFloat(acc) + parseFloat(mark.coef)
                }, 0)
                
                var ret = sumMarks/sumCoefs

                if( isNaN(ret) ){
                    return ''
                }else{
                    return ret.toFixed(2)                    
                }
            },
            disciplineTotal: function(discip){
                var avrg = this.disciplineAverage( discip )
                var ret = avrg * discip.coef

                if(avrg == ''){
                    return ''
                }else{
                    return ret.toFixed(2)
                }
            },
            marksUpdated: function(){
                var self = this
                var tmpDisciplines = this.disciplines

                tmpDisciplines = tmpDisciplines.map( function(discip){
                    discip.average = self.disciplineAverage( discip )
                    discip.total = self.disciplineTotal( discip )
                    return discip
                })

                // Emit to root
                eventBusBulletin.$emit("disciplinesUpdated", tmpDisciplines)
            },
            addNewMarkForDiscipline: function(markName, disciplineName){
                var self = this
                var confMsg = "هل أنت متأكد أنك تريد إضافة عدد "+markName+" لمادة ال"+disciplineName+" ?"
                if( window.confirm( confMsg ) ){
                    self.disciplines.forEach(function( dis, index, arr ){
                        if( dis.name == disciplineName ){
                            var mark = {
                                "name": markName,
                                "coef": "1",
                                "val": ""
                            }

                            self.disciplines[index].marks.push(mark)

                            self.marksUpdated()
                        }
                    })

                }
            }
        },
        computed:{
            coefSum:function(){
                var ret = this.disciplines.reduce( function(acc, discip){
                    
                    // غير معفى
                    if( !discip.exempt ){
                        return parseFloat(acc)+parseFloat(discip.coef)
                    }else{
                        return parseFloat(acc)
                    }
                },0)
                
                if(isNaN(ret)){
                    ret = ""
                }else{
                    ret = ret.toFixed(2)
                }

                return ret
            },
            marksSum:function(){
              var ret = this.disciplines.reduce( function(acc, discip){
                    
                    // غير معفى
                    if( !discip.exempt ){
                        return parseFloat(acc)+parseFloat(discip.total)
                    }else{
                        return parseFloat(acc)
                    }
                },0)
                
                if(isNaN(ret)){
                    ret = ""
                }else{
                    ret = ret.toFixed(2)
                }

                return ret
            },
            average:function(){
                var ret = this.marksSum/this.coefSum
                return ret.toFixed(2)
            }
        },
        created:function(){

        }
    }

</script>

<style scoped>
    th, td {
        border: 1px solid black;
        text-align: center;
        padding: 3px;
    }
    input {
        width: 6rem;
        text-align: center;
        font-weight: bold;
        direction: ltr;

    }

    td.discipline_name{
        text-align: center;
        width: 180px;
        font-weight: bold;
        direction: rtl;
    }

    tr button.ext {
        opacity: 0;
        width: 8rem;
    }
    tr.exempt{
        background: #9E9E9E;
    }
    tr.exempt button.ext {
        background: #8BC34A;
        font-weight: bold;
    }
    tr:hover button.ext,
    tr.exempt button.ext {
        opacity: 1;
    }
    input.empty{
        background: #ff980042;
    }
    input.error{
        background: red;
        color: white;
    }
    input.zero{
        background: yellow;
    }
    input.filled{
        background: #8BC34A;
    }

    button.add{
        display: none;
        margin-left: auto;
        margin-right: auto;
    }
    td:hover button.add{
        display: block;
    }
</style>
