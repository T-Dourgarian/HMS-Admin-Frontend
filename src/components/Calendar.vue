<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
				<v-toolbar-title>
					{{ selectedEvent.details }} - {{ selectedEvent.customerName }}
				</v-toolbar-title>
            </v-toolbar>
            <v-card-text>

				<v-col>
					<div>
						<div style="font-size:15px"><b>Details</b></div>

						<div>
							<v-icon x-small>fas fa-hotel</v-icon>
							<span style="margin: auto 0 auto 5px;"> - {{ selectedEvent.customerName }}</span>
						</div>
					</div>
				</v-col>
				<v-col>
					<div>
						<v-icon x-small>fas fa-user</v-icon>
						<span style="margin: auto 0 auto 5px;"> - {{ selectedEvent.customerName }}</span>
					</div>
					<div>
						<v-icon x-small>fas fa-envelope</v-icon>
						<span style="margin: auto 0 auto 5px;"> - {{ selectedEvent.customerEmail }}</span>
					</div>
					<div>
						<v-icon x-small>fas fa-phone</v-icon>
						<span style="margin: auto 0 auto 5px;"> - {{ selectedEvent.customerPhoneNumber }}</span>
					</div>
				</v-col>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';
export default {
    data: () => ({
		today: new Date().toISOString().substring(0,10),
		focus: new Date().toISOString().substring(0,10),
		type: 'month',
		typeToLabel: {
			month: 'Month',
			week: 'Week',
			day: 'Day',
			'4day': '4 Days',
		},
		name: [],
		details: [],
		start: [],
		end: [],
		currentlyEditing: null,
		selectedEvent: {},
		selectedElement: null,
		selectedOpen: false,
		events: [],
		dialog: false,
		colors: 'blue'
    }),
    created () {
      this.getBookings();
    },
    methods: {
		async getBookings() {
			try {
				const { data } = await axios.get('http://localhost:3000/api/booking');

				console.log(data.bookings)

				this.events = data.bookings.map(booking => {
					return {
						name: booking.customerDetails.name,
						details: 'Booking',
						start: booking.checkIn.substring(0,10),
						end: booking.checkOut.substring(0,10),
						color:'red',
						customerName: booking.customerDetails.name ? booking.customerDetails.name : 'N/A',
						customerPhoneNumber: booking.customerDetails.phoneNumber  ? booking.customerDetails.phoneNumber : 'N/A',
						customerEmail: booking.customerDetails.email ? booking.customerDetails.email : 'N/A'
					}
				})

			} catch(error) {
				console.log(error)
			}
		},
		viewDay ({ date }) {
			this.focus = date
			this.type = 'day'
		},
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
		this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
			console.log(event)

        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => {
            this.selectedOpen = true
          }, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
		rnd (a, b) {
			return Math.floor((b - a + 1) * Math.random()) + a
		},
    },
  }
</script>

<style>

</style>