if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/ADMIN/.gradle/caches/transforms-4/d0ed29542a04dd323b6c33c50ce69a5b/transformed/jetified-hermes-android-0.74.1-debug/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/ADMIN/.gradle/caches/transforms-4/d0ed29542a04dd323b6c33c50ce69a5b/transformed/jetified-hermes-android-0.74.1-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

