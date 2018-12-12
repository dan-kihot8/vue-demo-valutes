
<template>
	<div>
		<router-link to="/ru">Ru</router-link><br>
        <span>Choose the base rate: </span>
        <select v-model="baseRate">
            <option v-for="rate in $store.state.rates" v-bind:value="rate">
            {{ rate }}
          </option>
        </select>
        <div>Choose the rates to compare: </div>
        <input type="checkbox" @click="selectAll" v-model="allSelected">
        <label>Select all</label><br>
        <span v-for="rate in $store.state.rates" >
            <input type="checkbox" :value="rate" v-model="checkedScopes">
            <label>{{rate}}</label>
        </span>
        <div>Choose date from: </div>
        <datepicker :disabledDates="disabledDates" v-model="date_from"></datepicker>
        
        <div>Choose date to: </div>
        <datepicker :disabledDates="disabledDates" v-model="date_to"></datepicker>
	</div>
</template>



<script src="../main.js"></script/> 