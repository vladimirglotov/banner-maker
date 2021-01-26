<template>
	<div class="configurator-background__img">
          <input type="text" @blur="submit" name="img" v-model.trim="image" placeholder="Вставьте ссылку">
           <!-- <div id="tableBanner">	</div> -->
        </div>
</template>

<script>
	export default {

		data: () => ({
			image:''
		}),
		methods: {
			submit() {
    		  this.$emit('submit', this.image)
  		  	}
 		}
	}


</script>
