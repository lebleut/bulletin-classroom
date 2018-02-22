<template>
    <div>
        <hr>
        <h2 style="text-align:center; direction:rtl;">المدرسة الإعدادية بالبقالطة</h2>
        <h1 style="text-align:center; direction:rtl;">بطاقة النتائج المدرسية (تقريبية)</h1>
        <hr>
        <table style="margin-left: auto; margin-right: auto;">
            <tr>
                <td colspan="12">
                    <app-info/>
                </td>
            </tr>
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
                <td style="font-weight: bold; font-size: 1.7rem; background:lightgrey;"><span v-if="!discipline.exempt">{{ discipline.average }}</span></td>
                
                <td v-for="( markName, indm ) in markNames">
                    <app-mark-cell :disciplines="disciplines" :discipline="discipline" :markName="markName" :indm="indm" />
                </td>

            </tr>
            <tr style="background: burlywood; font-weight: bold; font-size: large;">
                <td>المعدل العام</td>
                <td>{{ average }}</td>
                <td colspan="2" class="no-print" v-if="parseFloat(average) > 0">
                    <button style="width:100%;" onClick="window.print()">طباعة</button>
                </td>
            </tr>
        </table>
        <app-feedback/>
    </div>

</template>

<script>
    import { eventBusBulletin } from '../main.js'

    import Feedback from './Feedback.vue'
    import MarkCell from './MarkCell.vue'
    import Info from './Info.vue'

    export default {
        
        props: ['disciplines', 'markNames'],

        data: function(){
            return {
            }
        },
        components:{
            "app-feedback": Feedback,
            "app-mark-cell": MarkCell,
            "app-info": Info,
        },
        methods:{

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

<style>
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
