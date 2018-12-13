
<template>
	<div>
		<router-link to="/ru">Ru</router-link>
      <br><br>
      <v-app>
      <v-container fluid grid-list-xl>
        <v-layout wrap align-center> 
          <v-flex xs12 sm6 d-flex>
            <v-select 
                v-model="baseRate"
                :items="$store.state.rates"
                label="The base rate ">
            </v-select>
          </v-flex>
        </v-layout>

        <span>Choose the rates to compare: </span>
        <input type="checkbox" 
          class="v-input--selection-controls__input"
          @click="selectAll($store.state.rates)" 
          v-model="allSelected"
        >
        <v-label class="v-label theme--light">Select all</v-label><br>
        <v-layout row wrap>
        <span v-for="rate in $store.state.rates" >
          <v-flex xs12 sm4 md4>
          <v-checkbox 
            v-model="checkedScopes" 
            :label="rate" 
            :value="rate"
            color="indigo"
            hide-details
          ></v-checkbox>
          </v-flex>
          
        </span>
        </v-layout>
        <div>Choose date from: </div>
        <datepicker :disabledDates="disabledDates" v-model="date_from"></datepicker>
        
        <div>Choose date to: </div>
        <datepicker :disabledDates="disabledDates" v-model="date_to"></datepicker>
        <v-btn color="green" @click="getHistory($store)">Get history</v-btn>
        <v-alert
          v-model="alert.display"
          dismissible
          :type="alert.atype"
        >
        {{alert.value}}
        </v-alert>
        <v-btn 
          v-if="$store.state.history.rates!=undefined"
          color="yellow" 
          @click="showResult($store.state.history)"
        >
          Show history
        </v-btn>
      </v-container>
      </v-app>
	</div>
</template>



<script src="../main.js"></script/> 