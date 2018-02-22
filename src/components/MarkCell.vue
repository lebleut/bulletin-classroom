<template>
    <div>
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
    </div>
</template>

<script>
    import { eventBusBulletin } from '../main.js'

    export default {
        
        props: ['disciplines', 'discipline', 'markName', 'indm'],

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
    }
</script>

<style>
</style>