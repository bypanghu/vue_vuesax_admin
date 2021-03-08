<!-- =========================================================================================
	File Name: VxSidebarGroup.vue
	Description: Sidebar Group Component. Extends vuesax framework's 'vs-sidebar-group' component
	Component Name: VxSidebarGroup
	----------------------------------------------------------------------------------------
	Item Name: Vuesax Admin - VueJS Dashboard Admin Template
	Author: Pixinvent
	Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div
    :class="[{'vs-sidebar-group-open' : openItems}, {'vs-sidebar-group-active': open}, {'disabled-item pointer-events-none': group.hidden}]"
    class="vs-sidebar-group"
    @mouseover="mouseover"
    @mouseout="mouseout">
	<div @click="clickGroup" class="group-header w-full">
		<span class="flex items-center w-full">
			<feather-icon :icon="group.meta.icon || 'CircleIcon'" :svgClasses="{ 'w-3 h-3' : this.groupIndex % 1 != 0 }" v-if="group.meta.icon || (this.groupIndex > Math.floor(this.groupIndex))" />
			<span v-show="!sidebarItemsMin" class="truncate mr-3 select-none">{{  group.meta.name }}</span>
		</span>
		<feather-icon icon="ChevronRightIcon" svg-classes="w-4 h-4" :class="[{'rotate90' : openItems}, 'feather-grp-header-arrow']" v-show="!sidebarItemsMin" />
		<span class="vs-sidebar--tooltip">{{  group.meta.name }}</span>
    </div>
    <ul ref="items" :style="styleItems" class="vs-sidebar-group-items">
      <li v-for="(groupItem, index) in group.children" :key="index">
		<vx-sidebar-group :group="groupItem" :groupIndex="Number(`${groupIndex}.${index}`)" :open="isGroupActive(groupItem)" :openHover="openHover" v-if="groupItem.children" />
		<vx-sidebar-item :index="groupIndex + '.' + index" :to="group.path+'/'+groupItem.path"  :icon="group.meta.icon"  icon-small :target="groupItem.target" >
			<span class="truncate">{{groupItem.meta.name }}</span>
		</vx-sidebar-item>
      </li>
    </ul>
  </div>
</template>

<script>
import VxSidebarItem from './VxSidebarItem.vue'

export default {
    name: 'vx-sidebar-group',
    props: {
        openHover: {
            default: false,
            type: Boolean
        },
        open: {
            default: false,
            type: Boolean
        },
        group: {
            type: Object
        },
        groupIndex: {
            type: Number,
        },
        group_main_route:{
            type : String
        }
    },
    data: () => ({
        maxHeight: '0px',
        openItems: false
    }),
    computed: {
        sidebarItemsMin() {
            return this.$store.state.sidebarItemsMin;
        },
        styleItems() {
            return {
                maxHeight: this.maxHeight
            }
        },
        itemIcon() {
            return (index) => {
                if (!((index.match(/\./g) || []).length > 1)) return "CircleIcon"
            }
        },
        isGroupActive() {
            return (sidebarItem) => {
                const path = this.$route.fullPath;
                let open = false;
                let func = function(sidebarItem) {
                    if (sidebarItem.children) {
                        sidebarItem.children.forEach((item) => {
                           if (path == sidebarItem.path +'/'+item.path) {
                                open = true
                            } else if (item.children) {
                                func(item)
                            }
                        })
                    }
                }

                func(sidebarItem)
                return open
            }
        },
    },
    watch: {
        // OPEN & CLOSES DROPDOWN ON ROUTE CHANGE
        '$route'() {
			if(this.sidebarItemsMin) return
            let scrollHeight = this.scrollHeight
            if (this.openItems && !this.open) {
                this.maxHeight = `${scrollHeight}px`
                setTimeout(() => {
                    this.maxHeight = `${0}px`
                }, 50)
            } else if (this.open) {
                this.maxHeight = `${scrollHeight}px`
                setTimeout(() => {
                    this.maxHeight = 'none'
                }, 300)
            }
        },
        maxHeight() {
            this.openItems = this.maxHeight != '0px'
        },
        // OPEN AND CLOSES DROPDOWN MENU ON SIDEBAR COLLAPSE AND DEFAULT VIEW
        '$store.state.sidebarItemsMin'(val) {
            let scrollHeight = this.$refs.items.scrollHeight
            if (!val && this.open) {
                this.maxHeight = `${scrollHeight}px`
                setTimeout(() => {
                    this.maxHeight = 'none'
                }, 300)
            } else {
                this.maxHeight = `${scrollHeight}px`
                setTimeout(() => {
                    this.maxHeight = '0px'
                }, 50)
            }
            if(val && this.open) {
				this.maxHeight = `${scrollHeight}px`
				setTimeout(() => {
					this.maxHeight = '0px'
				}, 250)
            }
        }
    },
    methods: {
        clickGroup() {
            if (!this.openHover) {
                let thisScrollHeight = this.$refs.items.scrollHeight
                if (this.maxHeight == '0px') {
                    this.maxHeight = `${thisScrollHeight}px`
                    setTimeout(() => {
                        this.maxHeight = 'none'
                    }, 300)
                } else {
                    this.maxHeight = `${thisScrollHeight}px`
                    setTimeout(() => {
                        this.maxHeight = `${0}px`
                    }, 50)
                }

                this.$parent.$children.map((child) => {
                    if (child.isGroupActive) {

                        if (child !== this && (!child.open) && child.maxHeight != '0px') {
                            setTimeout(() => {
                                child.maxHeight = `${0}px`
                            }, 50)
                        }
                    }
                })
            }
        },
        mouseover() {
            if (this.openHover) {
                let scrollHeight = this.$refs.items.scrollHeight
                this.maxHeight = `${scrollHeight}px`
            }
        },
        mouseout() {
            if (this.openHover) {
                let scrollHeight = 0
                this.maxHeight = `${scrollHeight}px`
            }
        }
    },
    components: {
        VxSidebarItem
    },
    mounted() {
        this.openItems = this.open
        if (this.open) {
            this.maxHeight = 'none'
        }
    },
}
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/components/vxSidebarGroup.scss"
</style>
