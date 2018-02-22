<template>
	<div class="info">
		<div>
			<label>
				إسم التلميذ و لقبه :
				<input class="name" />
			</label>
		</div>
		<div>
			<label>
				القسم :
				<select>
					<option>سابعة تعليم أساسي </option>
					<option>ثامنة تعليم أساسي</option>
					<option>تاسعة تعليم أساسي</option>
				</select>
				<select>
					<option v-for="num in 20">{{ num }}</option>
				</select>
			</label>
		</div>
	</div>
</template>

<style scoped>
	.info{
		text-align: right;
		direction: rtl;
		padding: 5px;
	}
	.info input.name{
		width: 300px;
	    text-align: right;
	    padding: 0px 3px;		
	}
</style>