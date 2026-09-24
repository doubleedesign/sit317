<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue';
import GlobalFooter from '@/components/GlobalFooter.vue';
import HeroBanner from '@/components/HeroBanner.vue';
import TextBlock from '@/components/TextBlock.vue';
import CallToAction from '@/components/CallToAction.vue';
import FeatureRow from '@/components/FeatureRow.vue';
import '@doubleedesign/animate-into-view/dist/animate-into-view.css';
import '@doubleedesign/animate-into-view/dist/animate-into-view.js';
</script>

<template>
    <GlobalHeader/>
    <HeroBanner/>
    <main>
        <TextBlock content="intro" color="accent" background="primary"/>
        <TextBlock content="body" background="primary"/>
        <TextBlock content="testimonial" background="primary-accent" animation="fadeInDown"/>
        <FeatureRow/>
    </main>
    <CallToAction/>
    <GlobalFooter/>
</template>