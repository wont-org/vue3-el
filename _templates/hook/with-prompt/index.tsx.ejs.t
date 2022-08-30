---
  to: components/<%= name %>/index.tsx
---
import {ref} from 'vue'
import type {Ref} from 'vue'

export default function <%= name %> (){
    const countRef: Ref<number> = ref(0)

    return {
        countRef,
    }
}
