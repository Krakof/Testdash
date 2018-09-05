<template>
    <div class="status">
        <label
                v-for="(status, index) in statusList"
                :class="[`label${index}`,{selected: propStatus === status.value}]"
                @click="changeStatus(status.value)"
        >
            {{status.slug}}
        </label>
    </div>
</template>

<script>
    export default {
        name: "radio-button",
        props: ['propStatus', 'changeStatus', 'statusList'],
    }
</script>

<style scoped lang="scss">
    .status {
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;

        label {
            padding: 10px 0;
            border: 1px solid $borderColor;
            cursor: pointer;
            color: transparentize($textColor, 0.5);
            width: 120px;
            text-align: center;

            &.label0 {
                margin-right: -1px;
                border-radius: $borderRadius 0 0 $borderRadius;
            }

            &.label1 {
                border-radius: 0 $borderRadius $borderRadius 0;
            }
        }

        .selected {
            background: #ffffff;
            color: $textColor;
            box-shadow: $shadow;
        }
    }
</style>