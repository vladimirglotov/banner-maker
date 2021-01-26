<template>
	<section class="configurator-words">
		<h2>Какой будет текст?</h2>
		<div class="configurator-words__header">
			<input type="text" @input="sendText" maxlength="100" placeholder="Заголовок" v-model="header">
		</div>
		<div class="configurator-words__text">
		    <input type="text" @input="sendText" maxlength="300" placeholder="Текст" v-model="text">
		</div>
		<div class="configurator-words__buttons">
		  	<button @click="makeTextWhite">White</button>
		   	<button @click="makeTextBlack">Black</button>
		</div>
	</section>
</template>

<script>

export default {

	data: () => ({

		header:'',
		text:'',

	}),

	methods: {
		sendText() {
    		this.$emit('setText', [this.header, this.text])
  		},
		makeTextWhite () {
			this.$emit ('setColorText', 'white')
		},
		makeTextBlack () {
			this.$emit('setColorText', 'black')
		},
	}

}

</script>