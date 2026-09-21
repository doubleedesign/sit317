<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue';
import GlobalFooter from '@/components/GlobalFooter.vue';
import HeroBanner from '@/components/HeroBanner.vue';
import TextBlock from '@/components/TextBlock.vue';
import CallToAction from '@/components/CallToAction.vue';
</script>

<template>
    <GlobalHeader/>
    <HeroBanner/>
    <main>
        <TextBlock content="intro" color="accent"/>
        <TextBlock content="body"/>
    </main>
    <CallToAction/>
    <GlobalFooter/>
</template>