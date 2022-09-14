<template>
	<img
		class="sentc-logo"
		alt="Sentc Logo"
		src="/Sentc.png"
	>
</template>

<style>
.sentc-logo {
  height: 170px;
  width: 170px;
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
