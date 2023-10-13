<script lang="ts">
export default {
    methods: {
        setFormkitLocale(locale: 'en' | 'ar') {
            this.$formkit.setLocale(locale)
        },
    },

    render: () => null
}
</script>