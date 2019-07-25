import { toRoles } from "@/common/utils/role"
export default [
    {
        path: "/{{ name }}",
        component: () => import("@/common/layouts/Home"),
        redirect: "/users/list",
        name: "{{ name }}",
        meta: {
            roles: toRoles("{{ roles }}"),
            title: "{{ title }}",
            icon: "el-icon-ali-icon_yuangongguanli"
        },
        children: [
            {
                path: "list",
                component: () => import("@/pages/{{ page }}/views/{{ name }}"),
                name: "{{ title }}List",
                meta: {
                    icon: "el-icon-ali-yonghu",
                    roles: toRoles("{{ roles }}"),
                    title: "{{ title }}"
                }
            }
        ]
    }
]