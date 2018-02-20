<template>
    <div class="container" style="overflow-x: scroll;">
        <hr>
        <h2>المدرسة الإعدادية بالبقالطة</h2>
        <h1 style="text-align:center;">بطاقة النتائج المدرسية (تقريبية)</h1>
        <hr>
        <table>
            <tr>
                <th>المادة</th>
                <th>الضارب</th> 
                
                <th v-for="markName in markNames">{{ markName }}</th>

                <th>المعدل</th>
                <th>المجموع</th>
            </tr>
            <tr :class="{exempt: discipline.exempt}" v-for="( discipline, indd ) in disciplines">
                <td class="discipline_name">
                    {{ discipline.name }}
                    <button
                        style="float: left;"
                        @click="disciplines[indd].exempt = !disciplines[indd].exempt"
                    >معفى<span> ؟</span></button>
                </td>
                <td><span v-if="!discipline.exempt">{{ discipline.coef }}</span></td>
                
                <td v-for="( markName, indm ) in markNames">
                    <input
                        type="number"
                        v-model="discipline.marks.filter( function(m){ return m.name == markName })[0].val"
                        @input="marksUpdated()"
                        placeholder="--.--"
                        :class="{
                            zero: parseFloat(discipline.marks.filter( function(m){ return m.name == markName })[0].val) == 0,
                            error: parseFloat(discipline.marks.filter( function(m){ return m.name == markName })[0].val) > 20 || parseFloat(discipline.marks.filter( function(m){ return m.name == markName })[0].val) < 0
                        }"
                        :tabindex="indd+1"
                        v-if="!discipline.exempt && discipline.marks.filter(function(mrk){ return mrk.name == markName }).length > 0"
                    >
                </td>

                <td><span v-if="!discipline.exempt">{{ discipline.average }}</span></td>
                <td><span v-if="!discipline.exempt">{{ discipline.total }}</span></td>
            </tr>
            <tr>
                <td>Coefs</td>
                <td>{{ coefSum }}</td>
            </tr>
            <tr>
                <td>total</td>
                <td>{{ marksSum }}</td>
            </tr>
            <tr>
                <td>المعدل العام</td>
                <td>{{ average }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    import { eventBusBulletin } from '../main.js'


    export default {
        
        props: ['disciplines', 'markNames'],

        data: function(){
            return {
            }
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
        text-align: right;
        width: 180px;
    }

    tr button {
        opacity: 0;
        width: 8rem;
    }
    tr.exempt{
        background: #9E9E9E;
    }
    tr.exempt button {
        background: #8BC34A;
        font-weight: bold;
    }
    tr:hover button,
    tr.exempt button {
        opacity: 1;
    }

    input.error{
        background: red;
        color: white;
    }
    input.zero{
        background: yellow;
    }

</style>
