import Vue from 'vue';

import { Apis } from '@/apis';

declare module 'vue/types/vue' {
    interface Vue {
        $api: Apis;
    }
}
